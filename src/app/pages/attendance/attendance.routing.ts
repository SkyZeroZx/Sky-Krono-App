import { Routes } from '@angular/router';
import { AttendanceComponent } from './attendance.component';

export const AttendanceRouter: Routes = [
  {
    path: '',
    component: AttendanceComponent,
    data: { animation: 'attendance' },
  },
];
