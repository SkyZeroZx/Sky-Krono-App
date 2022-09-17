import { Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

export const SettingsRouter: Routes = [
  {
    path: '',
    component: SettingsComponent,
    data: { animation: 'settings' },
  },
];
