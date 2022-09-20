import { Routes } from '@angular/router';
import { ManageUsersComponent } from './manage-users.component';

export const ManageUsersRouter: Routes = [
  {
    path: '',
    component: ManageUsersComponent,
    data: { animation: 'manage-users' },
  },
];
