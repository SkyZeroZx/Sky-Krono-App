import { Routes } from '@angular/router';
import { ChartsAttendanceComponent } from './charts-attendance.component';
 

export const ChartsAttendanceRouter: Routes = [
  {
    path: '',
    component: ChartsAttendanceComponent,
    data: { animation: 'charts-attendance' },
  },
];
