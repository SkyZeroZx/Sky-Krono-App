import { Routes } from '@angular/router';
import { LicenceComponent } from './licence.component';

export const LicenceRouter: Routes = [
  {
    path: '',
    component: LicenceComponent,
    data: { animation: 'licence' },
  },
];
