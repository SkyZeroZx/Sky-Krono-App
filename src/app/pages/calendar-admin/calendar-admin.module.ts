import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CalendarOptions, defineFullCalendarElement } from '@fullcalendar/web-component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarAdminRouter } from './calendar-admin.routing';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CalendarAdminComponent } from './calendar-admin.component';

defineLocale('es', esLocale);
// Importaciones de FullCalendarModule

defineFullCalendarElement();
@NgModule({
  declarations: [CalendarAdminComponent, CreateTaskComponent, UpdateTaskComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    NgSelectModule,
    ModalModule.forRoot(),
    RouterModule.forChild(CalendarAdminRouter),
  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarAdminModule {}
