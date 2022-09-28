import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  darkTheme: boolean = this.themeService.getLocalStorageItem('darkTheme');
  changePasswordForm: FormGroup;
  diferent: boolean = false;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private themeService: ThemeService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.createFormChangePassword();
  }

  createFormChangePassword() {
    this.changePasswordForm = this.fb.group({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmedPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onChangePassword() {
    this.diferent = false;
    if (
      this.changePasswordForm.value.newPassword !==
      this.changePasswordForm.value.confirmedPassword
    ) {
      this.diferent = true;
      return;
    }

    this.authService.changePassword(this.changePasswordForm.value).subscribe({
      next: (_res) => {
        if (this.authService.getItemToken('firstLogin')) {
          this.authService.logout();
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/home']);
        }
        this.toastrService.success('Se cambio con exitosa la contraseña');
      },
      error: (_err) => {
        this.toastrService.error('Error al cambiar contraseña');
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
