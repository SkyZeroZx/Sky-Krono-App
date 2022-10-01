import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { defineFullCalendarElement } from '@fullcalendar/web-component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarAdminRouter } from './calendar-admin.routing';
import { RouterModule } from '@angular/router';
import { CalendarAdminComponent } from './calendar-admin.component';
import { BsDatepickerModule, BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { getDatepickerConfig } from '../../common/config/Datepicker';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

defineLocale('es', esLocale);
defineFullCalendarElement();
@NgModule({
  declarations: [CalendarAdminComponent, CreateTaskComponent, UpdateTaskComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    NgSelectModule,
    SweetAlert2Module.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forChild(CalendarAdminRouter),
  ],
  providers: [
    DatePipe,
    { provide: BsDaterangepickerConfig, useFactory: getDatepickerConfig },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarAdminModule {}
