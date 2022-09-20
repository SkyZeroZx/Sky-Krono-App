import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CalendarOptions, defineFullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CalendarViewComponent } from './calendar-view.component';
import { CalendarViewDetailComponent } from './components/detail/calendar-view-detail..component';
import { CalendarViewRouter } from './calendar-view.routing';

defineLocale('es', esLocale);
// Importaciones de FullCalendarModule
/*CalendarOptions.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);*/
defineFullCalendarElement();
@NgModule({
  declarations: [CalendarViewComponent, CalendarViewDetailComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forChild(CalendarViewRouter),
    ReactiveFormsModule,
    NgSelectModule,
    ModalModule.forRoot(),
  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarViewModule {}
