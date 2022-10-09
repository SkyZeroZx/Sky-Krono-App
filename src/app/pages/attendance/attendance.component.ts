import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { Attendance } from '../../common/interfaces';
import { Util } from '../../common/utils/util';
import { AttendanceService } from '../../services/attendance/attendance.service';
import { ScheduleService } from '../../services/schedule/schedule.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent
  implements AfterViewInit, OnDestroy, AfterContentChecked
{
  date: string = new Date().toString();
  countDownConfig: CountdownConfig = { leftTime: 0, demand: true };
  restSeconds: number;
  countInterval: NodeJS.Timer;
  totalSecondsOfSchedule: number;
  userExitHour: string;
  dayIsValid: boolean = false;
  initAnimation: boolean = false;
  spinnerValue: number = 0;
  isActiveExitAttendance: boolean = false;
  isActiveEntryAttendance: boolean = false;
  constructor(
    private attendanceService: AttendanceService,
    private scheduleService: ScheduleService,
    private toastrService: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.getScheduleByUser();
  }

  ngOnDestroy(): void {
    this.initAnimation = false;
    this.isActiveEntryAttendance = false;
    this.spinnerValue = 101;
    clearInterval(this.countInterval);
  }

  getScheduleByUser() {
    this.scheduleService.getScheduleByUser().subscribe({
      next: ({ dayIsValid, schedule: { entryHour, exitHour } }) => {
        this.dayIsValid = dayIsValid;
        this.userExitHour = exitHour;
        this.totalSecondsOfSchedule = Util.totalSecondsOfSchedule(entryHour, exitHour);
        this.getAttendanceToday();
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al obtener el horario');
      },
    });
  }

  getAttendanceToday(): void {
    this.attendanceService.getAttendanceByUser().subscribe({
      next: (res) => {
        this.initCountDown(res);
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al obtener la asistencia');
      },
    });
  }

  initCountDown(attendanceByUser: Attendance) {
    if (attendanceByUser) {
      this.isActiveExitAttendance = attendanceByUser.isActive;
      this.initAnimation = true;
      this.countDownConfig = {
        leftTime: Util.restSecondsOfDay(this.userExitHour),
      };
    }

    if (attendanceByUser == null) {
      this.isActiveEntryAttendance = true;
    }
  }

  restartCountdown({ action }: CountdownEvent) {
    if (action == 'restart') {
      this.initSpinner();
    }
  }

  initSpinner() {
    this.countInterval = setInterval(() => {
      let diferent =
        this.totalSecondsOfSchedule - Util.restSecondsOfDay(this.userExitHour);
      this.spinnerValue = (diferent / this.totalSecondsOfSchedule) * 100;
      if (this.spinnerValue >= 100) {
        this.ngOnDestroy();
      }
    }, 1000);
    this.isAttendanceActive();
  }

  isAttendanceActive() {
    if (!this.isActiveExitAttendance) {
      this.ngOnDestroy();
    }
  }

  registerEntryAttendance(description: string) {
    this.attendanceService.registerEntryAttendance(description).subscribe({
      next: (_res) => {
        this.getScheduleByUser();
        this.isActiveEntryAttendance = false;
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al registrar su entrada');
      },
    });
  }

  registerExitAttendance() {
    this.attendanceService.registerExitAttendance().subscribe({
      next: (_res) => {
        this.ngOnDestroy();
        this.isActiveExitAttendance = false;
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al registrar su salida');
      },
    });
  }
}
