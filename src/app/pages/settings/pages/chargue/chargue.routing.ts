import { Routes } from '@angular/router';
import { ChargueComponent } from './chargue.component';

export const ChargueRouter: Routes = [
  {
    path: '',
    component: ChargueComponent,
    data: { animation: 'chargue' },
  },
];
