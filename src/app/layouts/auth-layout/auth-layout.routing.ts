import { Routes } from '@angular/router';
import { CheckLogin } from '@core/guards/check-login.guard';
import { IsLogged } from '@core/guards/is-logged.guard';
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
