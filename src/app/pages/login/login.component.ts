import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { startAuthentication } from '@simplewebauthn/browser';
import { PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/typescript-types';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@service/auth/auth.service';
import { ThemeService } from '@service/theme/theme.service';
import { UserLoginResponse } from '@core/interfaces';

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
  @ViewChild('swalIsFirstLogin')
  readonly swalIsFirstLogin: SwalComponent;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private themeService: ThemeService,
  ) {}

  ngOnInit() {
    localStorage.removeItem('user');
    this.createFormLogin();
  }

  createFormLogin() {
    this.loginForm = this.fb.group({
      username: new FormControl(this.userStorage == null ? '' : this.userStorage, [
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
        this.isFirstLogin(res);
        this.isUserStorage();
      },
      error: (_err) => {
        this.toastrService.error('Error al logearse');
      },
    });
  }

  isFirstLogin(res: UserLoginResponse) {
    if (res.firstLogin) {
      this.swalIsFirstLogin.fire();
    } else {
      localStorage.setItem('username', this.loginForm.value.username);
      this.router.navigate(['/home']);
    }
  }

  isUserStorage() {
    if (this.loginForm.value.username !== this.userStorage) {
      localStorage.setItem('verified', 'null');
    }
  }

  confirmFirstLogin() {
    this.router.navigate(['/change-password']);
  }

  dismissFirstLogin() {
    localStorage.removeItem('user');
  }

  startAuthentication() {
    this.authService.startAuthentication(this.userStorage).subscribe({
      next: async (res: PublicKeyCredentialRequestOptionsJSON) => {
        try {
          const asseRep = await startAuthentication(res);
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
          this.isFirstLogin(res.data);
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
