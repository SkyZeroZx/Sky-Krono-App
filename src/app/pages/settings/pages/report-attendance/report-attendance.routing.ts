import { Routes } from '@angular/router';
import { ReportAttendanceComponent } from './report-attendance.component';

export const ReportAttendanceRouter: Routes = [
  {
    path: '',
    component: ReportAttendanceComponent,
    data: { animation: 'report-attendance' },
  },
];
