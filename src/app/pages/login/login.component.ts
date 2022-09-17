import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { startAuthentication } from '@simplewebauthn/browser';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/common/constants/Constant';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userStorage: string = localStorage.getItem('username');
  enableFingerPrint: boolean = !this.themeService.getLocalStorageItem('verified');
  darkTheme: boolean = this.themeService.getLocalStorageItem('darkTheme');

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private themeService: ThemeService,
  ) {}

  ngOnInit() {
    localStorage.removeItem('user');
    console.log('verified', !this.themeService.getLocalStorageItem('verified'));
    console.log('Dark Theme ', this.themeService.getLocalStorageItem('darkTheme'));
    this.crearFormularioLogin();
    this.loginForm.controls.username.setValue(this.userStorage == null ? '' : this.userStorage);
  }

  crearFormularioLogin() {
    this.loginForm = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.message == Constant.MENSAJE_OK) {
          this.validateLogin(res);
        } else {
          this.toastrService.error(res.message);
        }
      },
      error: (_err) => {
        this.toastrService.error('Error al logearse');
      },
    });
  }

  validateLogin(res) {
    if (res.firstLogin) {
      this.alertFirstLogin();
    } else {
      if (this.loginForm.value.username !== this.userStorage) {
        localStorage.setItem('verified', 'null');
      }
      localStorage.setItem('username', this.loginForm.value.username);
      if (res.role == 'admin') {
        this.router.navigate(['/calendar-admin']);
      } else {
        this.router.navigate(['/calendar-view']);
      }
    }
  }

  alertFirstLogin() {
    Swal.fire({
      title: 'Es su primer login',
      text: 'Se recomienda cambiar su contraseña',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.router.navigate(['/change-password']);
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  async startAuthentication() {
    this.authService.startAuthentication(this.userStorage).subscribe({
      next: async (res) => {
        try {
          const asseRep = await startAuthentication(await res);
          Object.assign(asseRep, { username: this.userStorage });
          this.verifityAuthentication(asseRep);
        } catch (_err) {
          this.toastrService.error('Sucedio un error al intentar autenticarse');
        }
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al intentar autenticarse');
      },
    });
  }

  verifityAuthentication(data) {
    this.authService.verifityAuthentication(data).subscribe({
      next: (res) => {
        if (res.verified) {
          this.validateLogin(res.data);
        } else {
          this.toastrService.error('Error al logearse');
        }
      },
      error: (_err) => {
        this.toastrService.error('Error al logearse');
      },
    });
  }
}
