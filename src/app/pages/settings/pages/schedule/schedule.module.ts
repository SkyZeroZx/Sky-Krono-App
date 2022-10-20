import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { CreateScheduleComponent } from './components/create-schedule/create-schedule.component';
import { UpdateScheduleComponent } from './components/update-schedule/update-schedule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ScheduleRouter } from './schedule.routing';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FilterSchedule } from '../../../../common/pipes/filter-schedule.pipe';

@NgModule({
  declarations: [
    ScheduleComponent,
    CreateScheduleComponent,
    UpdateScheduleComponent,
    FilterSchedule,
  ],
  imports: [
    CommonModule,
    ButtonsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SweetAlert2Module.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forChild(ScheduleRouter),
  ],
})
export class ScheduleModule {}
