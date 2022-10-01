import { Routes } from '@angular/router';
import { ScheduleComponent } from './schedule.component';

export const ScheduleRouter: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    data: { animation: 'schedule' },
  },
];
