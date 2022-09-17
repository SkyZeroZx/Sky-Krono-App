import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScheduleComponent } from "./schedule.component";
import { CreateScheduleComponent } from "./components/create-schedule/create-schedule.component";
import { UpdateScheduleComponent } from "./components/update-schedule/update-schedule.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { RouterModule } from "@angular/router";
import { ModalModule } from "ngx-bootstrap/modal";
import { ScheduleRouter } from "./schedule.routing";
import { FilterSchedule } from "../../common/pipes/filterSchedule.pipe";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { ButtonsModule } from 'ngx-bootstrap/buttons';


@NgModule({
  declarations: [
    ScheduleComponent,
    CreateScheduleComponent,
    UpdateScheduleComponent,
    FilterSchedule
  ],
  imports: [
    CommonModule,
    ButtonsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forChild(ScheduleRouter),
  ]
})
export class ScheduleModule {}
