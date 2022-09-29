import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SwPush } from '@angular/service-worker';
import { startRegistration } from '@simplewebauthn/browser';
import { RegistrationCredentialJSON } from '@simplewebauthn/typescript-types';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../services/auth/auth.service';
import { ThemeService } from '../../../../services/theme/theme.service';
import { UserService } from '../../../../services/users/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss'],
})
export class UserOptionsComponent implements OnInit {
  userOptionsForm: FormGroup;

  constructor(
    private themeService: ThemeService,
    private swPush: SwPush,
    private authService: AuthService,
    private toastrService: ToastrService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.createUserOptionsForm();
  }

  createUserOptionsForm(): void {
    this.userOptionsForm = this.fb.group({
      userTheme: new FormControl(this.themeService.getLocalStorageItem('darkTheme')),
      userNavBar: new FormControl(this.themeService.getLocalStorageItem('navBar')),
      userFingerPrint: new FormControl(this.themeService.getLocalStorageItem('verified')),
      notifications: new FormControl(
        this.themeService.getLocalStorageItem('notificaciones'),
      ),
      userInstallPwa: new FormControl(false),
    });
  }

  onChangeTheme({ checked }) {
    this.themeService.setTheme(checked);
  }

  onChangeFinterPrint({ checked }) {
    if (checked) {
      this.getRegistrationAuthnWeb();
    } else {
      this.disableFingerPrint();
    }
    localStorage.setItem('verified', checked);
  }

  onChangeNavBar({ checked }) {
    this.themeService.setNavBar(checked);
  }

  onChangeInstallPwa({ checked }) {
    if (checked) {
      this.installPwa();
    }
  }

  onChangeNotifications({ checked }) {
    if (checked) {
      this.suscribeToNotifications();
      localStorage.setItem('notificaciones', 'true');
    } else {
      localStorage.setItem('notificaciones', 'false');
    }
  }

  installPwa() {
    this.themeService.getInstallPwa.prompt();
  }

  shouldInstall(): boolean {
    return (
      !window.matchMedia('(display-mode: standalone)').matches &&
      this.themeService.getInstallPwa
    );
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

  disableFingerPrint() {
    this.userOptionsForm.controls.userFingerPrint.setValue(false, { emitEvent: false });
    localStorage.setItem('verified', 'false');
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
        this.toastrService.error('Sucedio un error al suscribirse ');
      });
  }

  disableNotifications() {
    this.userOptionsForm.controls.notifications.setValue(false, { emitEvent: false });
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

  getRegistrationAuthnWeb() {
    this.authService.getRegistrationAuthnWeb().subscribe({
      next: async (res) => {
        try {
          const attResp = await startRegistration(res);
          this.registerAuthnWeb(attResp);
        } catch (error) {
          this.validatePreviusRegisterWebAuthn(error);
        }
      },
      error: (_err) => {
        this.disableFingerPrint();
      },
    });
  }

  validatePreviusRegisterWebAuthn(error: any) {
    if (error.toString().includes('The authenticator was previously registered')) {
      Swal.fire('', 'Su dispositivo ya se encuentra registrado', 'info');
      this.storageUserData();
    } else {
      this.disableFingerPrint();
      Swal.fire('Error', 'Algo salio mal al registrarse', 'error');
    }
  }
}
