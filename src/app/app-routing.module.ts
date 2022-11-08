import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/auth-layout/auth-layout.module').then(
            (m) => m.AuthLayoutModule,
          ),
      },
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'calendar-admin',
        data: {
          role: ['admin'],
        },
        loadChildren: () =>
          import('./pages/calendar-admin/calendar-admin.module').then(
            (m) => m.CalendarAdminModule,
          ),
      },
      {
        path: 'calendar-view',
        data: {
          role: ['employee'],
        },
        loadChildren: () =>
          import('./pages/calendar-view/calendar-view.module').then(
            (m) => m.CalendarViewModule,
          ),
      },
      {
        path: 'user-profile',
        data: {
          role: ['employee', 'admin'],
        },
        loadChildren: () =>
          import('./pages/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule,
          ),
      },
      {
        path: 'manage-users',
        data: {
          role: ['admin'],
        },
        loadChildren: () =>
          import('./pages/settings/pages/manage-users/manage-users.module').then(
            (m) => m.ManageUsersModule,
          ),
      },
      {
        path: 'contacts',
        data: {
          role: ['employee', 'admin'],
        },
        loadChildren: () =>
          import('./pages/contacts/contacts.module').then((m) => m.ContactsModule),
      },
      {
        path: 'schedule',
        data: {
          role: ['admin'],
        },
        loadChildren: () =>
          import('./pages/settings/pages/schedule/schedule.module').then(
            (m) => m.ScheduleModule,
          ),
      },
      {
        path: 'chargue',
        data: {
          role: ['admin'],
        },
        loadChildren: () =>
          import('./pages/settings/pages/chargue/chargue.module').then(
            (m) => m.ChargueModule,
          ),
      },
      {
        path: 'attendance',
        data: {
          role: ['employee', 'admin'],
        },
        loadChildren: () =>
          import('./pages/attendance/attendance.module').then((m) => m.AttedanceModule),
      },
      {
        path: 'home',
        data: {
          role: ['admin', 'employee'],
        },
        loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'settings',
        data: {
          role: ['admin'],
        },
        loadChildren: () =>
          import('./pages/settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'types',
        data: {
          role: ['admin'],
        },
        loadChildren: () =>
          import('./pages/settings/pages/types/types.module').then((m) => m.TypesModule),
      },
      {
        path: 'licence',
        data: {
          role: ['admin'],
        },
        loadChildren: () =>
          import('./pages/settings/pages/licence/licence.module').then(
            (m) => m.LicenceModule,
          ),
      },
      {
        path: 'report-attendance',
        data: {
          role: ['admin'],
        },
        loadChildren: () =>
          import(
            './pages/settings/pages/report-attendance/report-attendance.module'
          ).then((m) => m.ReportAttendanceModule),
      },
      {
        path: 'charts-attendance',
        data: {
          role: ['admin'],
        },
        loadChildren: () =>
          import(
            './pages/settings/pages/charts-attendance/charts-attendance.module'
          ).then((m) => m.ChartsAttendanceModule),
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
