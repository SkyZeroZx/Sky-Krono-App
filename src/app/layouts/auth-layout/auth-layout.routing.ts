import { Routes } from '@angular/router';
import { CheckLogin } from 'src/app/common/guards/check-login.guard';
import { IsLogged } from 'src/app/common/guards/is-logged.guard';
import { ChangePasswordComponent } from 'src/app/pages/change-password/change-password.component';
import { LoginComponent } from 'src/app/pages/login/login.component';

export const AuthLayoutRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CheckLogin],
    data: { animation: 'login' },
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [IsLogged],
    data: { animation: 'change-password' },
  },
];
