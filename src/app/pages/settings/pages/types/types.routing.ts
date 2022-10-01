import { Routes } from '@angular/router';
import { TypesComponent } from './types.component';

export const TypesRouter: Routes = [
  {
    path: '',
    component: TypesComponent,
    data: { animation: 'types' },
  },
];
