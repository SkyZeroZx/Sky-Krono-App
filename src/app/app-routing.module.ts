import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
 
import { FirstLogin } from './common/guards/FirstLogin.guard';
import { IsLogged } from './common/guards/IsLogged.guard';
import { CheckRole } from './common/guards/checkRole.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'prefix',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/auth-layout/auth-layout.module').then((m) => m.AuthLayoutModule),
      },
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [FirstLogin, CheckRole, IsLogged],
    children: [
      {
        path: 'calendar-admin',
        loadChildren: () =>
          import('./pages/calendar-admin/calendar-admin.module').then((m) => m.CalendarAdminModule),
      },
      {
        path: 'calendar-view',
        loadChildren: () =>
          import('./pages/calendar-view/calendar-view.module').then((m) => m.CalendarViewModule),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('./pages/user-profile/user-profile.module').then((m) => m.UserProfileModule),
      },
      {
        path: 'gestion-usuarios',
        loadChildren: () =>
          import('./pages/manage-users/manage-users.module').then((m) => m.ManageUsersModule),
      },
      {
        path: 'contacts',
        loadChildren: () =>
          import('./pages/contacts/contacts.module').then((m) => m.ContactsModule),
      },
      {
        path: 'schedule',
        loadChildren: () =>
          import('./pages/schedule/schedule.module').then((m) => m.ScheduleModule),
      },
      {
        path: 'chargue',
        loadChildren: () => import('./pages/chargue/chargue.module').then((m) => m.ChargueModule),
      },
      {
        path: 'attendance',
        loadChildren: () =>
          import('./pages/attendance/attendance.module').then((m) => m.AttedanceModule),
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/settings/settings.module').then((m) => m.SettingsModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
