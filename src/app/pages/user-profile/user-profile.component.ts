import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { startRegistration } from '@simplewebauthn/browser';
import { RegistrationCredentialJSON } from '@simplewebauthn/typescript-types';
import { ToastrService } from 'ngx-toastr';
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

    //TODO REFACTOR IN NEW COMPONENTS PROFILE OPTIONS FOR USER 

  // Creamos nuestro formControls para los switch de userTheme , NavBar , FingerPrint y Notificaciones
  userTheme: FormControl = new FormControl(
    this.themeService.getLocalStorageItem('darkTheme'),
  );
  userNavBar: FormControl = new FormControl(
    this.themeService.getLocalStorageItem('navBar'),
  );
  userFingerPrint: FormControl = new FormControl(
    this.themeService.getLocalStorageItem('verified'),
  );
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
        this.installPwa();
      }
    });
  }

  installPwa() {
    this.themeService.getInstallPwa.prompt();
  }

  shouldInstall(): boolean {
    return !this.isRunningStandalone() && this.themeService.getInstallPwa;
  }

  isRunningStandalone(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches;
  }

  suscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: environment.VAPID_PUBLIC_KEY,
      })
      .then((token) => {
        this.saveNotification(token);
      })
      .catch((_err) => {
        this.disableNotifications();
        this.toastrService.error('Sucedio un error al suscribirse ', 'Error');
      });
  }

  disableNotifications() {
    this.notificacionesControl.setValue(false, { emitEvent: false });
    localStorage.setItem('notificaciones', 'false');
  }

  saveNotification(token: PushSubscription) {
    this.userService.saveUserNotification(token).subscribe({
      next: (_res) => {
        this.toastrService.success('Las notificaciones fueron habilitadas exitosamente');
      },
      error: (_err) => {
        console.log('Error al suscribir notificaciones saveNotification ', _err);
        this.disableNotifications();
        this.toastrService.error('Sucedio un error al suscribir sus notificaciones ');
      },
    });
  }

  disableFingerPrint() {
    this.userFingerPrint.setValue(false, { emitEvent: false });
    localStorage.setItem('verified', 'false');
  }

  getRegistrationAuthnWeb() {
    this.authService.getRegistrationAuthnWeb().subscribe({
      next: async (res) => {
        try {
          const attResp = await startRegistration(res);
          this.registerAuthnWeb(attResp);
        } catch (e) {
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

  registerAuthnWeb(registrationCredentialJSON: RegistrationCredentialJSON) {
    this.authService.verifyRegistration(registrationCredentialJSON).subscribe({
      next: (_res) => {
        Swal.fire('Exito', 'Se registro exitosamente', 'success');
        this.storageUserData();
      },
      error: (_err) => {
        this.disableFingerPrint();
        Swal.fire('Error', 'Algo salio mal al registrarse', 'error');
      },
    });
  }

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
        this.toastrService.success('Se actualizo exitosamente su perfil');
      },
      error: (_err) => {
        this.toastrService.error('Error al actualizar su perfil');
      },
    });
  }
}
