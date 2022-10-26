import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReportAttendanceComponent } from './report-attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { ReportAttendanceRouter } from './report-attendance.routing';
import { BsDatepickerModule, BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { getDatepickerConfig } from '../../../../common/config/Datepicker';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { filterAttendanceReport } from '../../../../common/pipes/filter-attendance-report.pipe';
defineLocale('es', esLocale);

@NgModule({
  declarations: [ReportAttendanceComponent, filterAttendanceReport],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    RouterModule.forChild(ReportAttendanceRouter),
  ],
  providers: [
    DatePipe,
    { provide: BsDaterangepickerConfig, useFactory: getDatepickerConfig },
  ],
})
export class ReportAttendanceModule {}
