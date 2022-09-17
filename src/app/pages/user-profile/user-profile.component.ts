import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { startRegistration } from '@simplewebauthn/browser';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/common/constants/Constant';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { UserService } from 'src/app/services/users/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private fb: FormBuilder,
    private swPush: SwPush,
    private authService: AuthService,
    private toastrService: ToastrService,
    private userService: UserService,
    private router: Router,
  ) {}

  // Creamos nuestro formControls para los switch de userTheme , NavBar , FingerPrint y Notificaciones
  userTheme: FormControl = new FormControl(this.themeService.getLocalStorageItem('darkTheme'));
  userNavBar: FormControl = new FormControl(this.themeService.getLocalStorageItem('navBar'));
  userFingerPrint: FormControl = new FormControl(this.themeService.getLocalStorageItem('verified'));
  notificacionesControl: FormControl = new FormControl(
    this.themeService.getLocalStorageItem('notificaciones'),
  );
  installPWAControl: FormControl = new FormControl(false);
  userProfileForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.createUserProfileForm();
    this.suscribeChange();
  }

  createUserProfileForm() {
    this.userProfileForm = this.fb.group({
      id: null,
      username: null,
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern('[A-Za-z ]+'),
        ]),
      ),
      role: null,
      status: null,
      motherLastName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern('[A-Za-z ]+'),
        ]),
      ),
      fatherLastName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern('[A-Za-z ]+'),
        ]),
      ),
      createAt: null,
      updateAt: null,
    });

    this.setProfileUser();
  }

  setProfileUser() {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.userProfileForm.patchValue(res);
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al obtener el perfil', 'Error');
      },
    });
  }

  // Nos suscribimos a nuestros formControls para escuchar los valores de los eventos y ejecutar segun sea necesario
  suscribeChange() {
    this.userTheme.valueChanges.subscribe((res) => {
      this.themeService.setTheme(res);
    });

    this.userNavBar.valueChanges.subscribe((res) => {
      this.themeService.setNavBar(res);
    });

    this.userFingerPrint.valueChanges.subscribe((res) => {
      if (res) {
        this.getRegistrationAuthnWeb();
      } else {
        this.disableFingerPrint();
      }
      localStorage.setItem('verified', res);
    });

    this.notificacionesControl.valueChanges.subscribe((res) => {
      if (res) {
        this.suscribeToNotifications();
        localStorage.setItem('notificaciones', 'true');
      } else {
        localStorage.setItem('notificaciones', 'false');
      }
    });

    this.installPWAControl.valueChanges.subscribe((res) => {
      if (res) {
        // Si el usuario habilita el switch le proponemos instalar
        this.installPwa();
      }
    });
  }

  // Metodo para llamar la propuesta de instalar nuestra PWA
  installPwa() {
    this.themeService.getInstallPwa.prompt();
  }

  // Metodo para validar si esta instalado por lo cual no mostrara el boton
  shouldInstall(): boolean {
    return !this.isRunningStandalone() && this.themeService.getInstallPwa;
  }

  //Metodo para validar si estamos en modo standalone
  isRunningStandalone(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches;
  }

  // Metodo que solicita al usuario habilitar las notificaciones en el navegador
  suscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: environment.VAPID_PUBLIC_KEY,
      })
      .then((token) => {
        // Validamos que el usuario de permisos
        this.saveNotification(token);
      })
      .catch((_err) => {
        this.disableNotificaciones();
        // En caso contrario de suceder un error lo notificamos
        this.toastrService.error('Sucedio un error al suscribirse ', 'Error');
      });
  }

  disableNotificaciones() {
    this.notificacionesControl.setValue(false, { emitEvent: false });
    localStorage.setItem('notificaciones', 'false');
  }

  formatSaveToken(token) {
    return { tokenPush: JSON.stringify(token) };
  }

  // Metodo que guarda el token push con el usuario en la base de datos
  saveNotification(token) {
    this.userService.saveUserNotification(this.formatSaveToken(token)).subscribe({
      next: (res) => {
        // Para el caso de exito de respuesta del servicio saveUserNotification
        if (res.message == Constant.MENSAJE_OK) {
          this.toastrService.success('Las notificaciones fueron habilitadas exitosamente', 'Exito');
        } else {
          this.disableNotificaciones();
          this.toastrService.error('Sucedio un error al suscribir sus notificaciones', 'Error');
        }
      },
      error: (_err) => {
        // En caso de un error con el servicio lo mostramos
        console.log('Error al suscribir notificaciones saveNotification ', _err);
        this.disableNotificaciones();
        this.toastrService.error('Sucedio un error al suscribir sus notificaciones ');
      },
    });
  }

  disableFingerPrint() {
    this.userFingerPrint.setValue(false, { emitEvent: false });
    localStorage.setItem('verified', 'false');
  }

  // Obtener solicitud de registro de WebAuthn para el usuario desde el servicio
  getRegistrationAuthnWeb() {
    this.authService.getRegistrationAuthnWeb().subscribe({
      next: async (res) => {
        try {
          // Con la respuesta empezamos el proceso
          const attResp = await startRegistration(res);
          // Si salio bien se llama al siguiente servicio para registrarlo
          this.registerAuthnWeb(attResp);
        } catch (e) {
          // Validamos en caso el dispositivo fue registrado anteriormente
          if (e.toString().includes('The authenticator was previously registered')) {
            Swal.fire('', 'Su dispositivo ya se encuentra registrado', 'info');
            this.storageUserData();
          } else {
            this.disableFingerPrint();
            Swal.fire('Error', 'Algo salio mal al registrarse', 'error');
          }
        }
      },
      error: (_err) => {
        this.disableFingerPrint();
      },
    });
  }

  // Registrar el dispositivo el metodo de verificacion
  registerAuthnWeb(data) {
    this.authService.verifyRegistration(data).subscribe({
      next: (_res) => {
        // Si va bien mostramos el mensaje de exito
        Swal.fire('Exito', 'Se registro exitosamente', 'success');
        this.storageUserData();
      },
      error: (_err) => {
        this.disableFingerPrint();
        Swal.fire('Error', 'Algo salio mal al registrarse', 'error');
      },
    });
  }

  // Metodo que guarda la informacion en el localStorage del usuario
  storageUserData() {
    localStorage.setItem('username', JSON.parse(localStorage.getItem('user')).username);
    localStorage.setItem('verified', 'true');
  }

  onLogout() {
    Swal.fire({
      title: 'Va cerrar sesión',
      text: '¿Esta seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/login']);
        localStorage.removeItem('user');
      }
    });
  }

  updateProfile() {
    this.userService.updateUser(this.userProfileForm.value).subscribe({
      next: (_res) => {
        this.toastrService.success('Se actualizo exitosamente su perfil', 'Exito');
      },
      error: (_err) => {
        this.toastrService.error('Error al actualizar su perfil ', 'Error');
      },
    });
  }
}
