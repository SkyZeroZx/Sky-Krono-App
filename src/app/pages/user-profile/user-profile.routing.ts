import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';

export const UserProfileRouter: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    data: { animation: 'user-profile' },
  },
];
