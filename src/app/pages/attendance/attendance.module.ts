import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceRouter } from './attendance.routing';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountdownModule } from 'ngx-countdown';
import { AttendanceComponent } from './attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AttendanceComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    CountdownModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(AttendanceRouter),
  ],
})
export class AttedanceModule {}
