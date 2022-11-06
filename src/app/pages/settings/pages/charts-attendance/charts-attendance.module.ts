import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartsAttendanceRouter } from './charts-attendance.routing';
import { NgChartsModule } from 'ng2-charts';
import { ChartsAttendanceComponent } from './charts-attendance.component';
import { BsDatepickerModule, BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { getDatepickerConfig } from '@core/config/datepicker.config';
import { BarAttendanceComponent } from './components/bar-attendance/bar-attendance.component';
import { PieAttendanceComponent } from './components/pie-attendance/pie-attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { CardsAttendanceComponent } from './components/cards-attendance/cards-attendance.component';
import { PolarAttendanceComponent } from './components/polar-attendance/polar-attendance.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LinearAttendanceComponent } from './components/linear-attendance/linear-attendance.component';

defineLocale('es', esLocale);
@NgModule({
  declarations: [
    ChartsAttendanceComponent,
    BarAttendanceComponent,
    PieAttendanceComponent,
    CardsAttendanceComponent,
    PolarAttendanceComponent,
    LinearAttendanceComponent,
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forChild(ChartsAttendanceRouter),
  ],
  providers: [
    DatePipe,
    { provide: BsDaterangepickerConfig, useFactory: getDatepickerConfig },
  ],
})
export class ChartsAttendanceModule {}
