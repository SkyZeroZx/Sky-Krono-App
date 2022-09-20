import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const HomeRouter: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: 'home' },
  },
];
