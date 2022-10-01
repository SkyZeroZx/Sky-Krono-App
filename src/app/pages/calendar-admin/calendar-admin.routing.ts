import { Routes } from '@angular/router';
import { CalendarAdminComponent } from './calendar-admin.component';

export const CalendarAdminRouter: Routes = [
  {
    path: '',
    component: CalendarAdminComponent,
    data: { animation: 'calendar-admin' },
  },
];
