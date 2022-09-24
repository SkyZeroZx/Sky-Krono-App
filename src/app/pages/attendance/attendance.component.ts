import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Attendance, AttendanceDescription } from '../../common/interfaces/attendance';
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
  rememberExitHour: string;
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
    console.log('On destroy');
    clearInterval(this.countInterval);
  }

  getScheduleByUser() {
    this.scheduleService.getScheduleByUser().subscribe({
      next: ({ dayIsValid, schedule: { entryHour, exitHour } }) => {
        this.dayIsValid = dayIsValid;
        this.rememberExitHour = exitHour;
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
        leftTime: Util.restSecondsOfDay(this.rememberExitHour),
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
    console.log('initSpinner');
    this.countInterval = setInterval(() => {
      let diferent =
        this.totalSecondsOfSchedule - Util.restSecondsOfDay(this.rememberExitHour);
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

  registerEntryAttendance(description : string) {
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

  alertRegisterAttendance() {
    Swal.fire({
      input: 'textarea',
      inputLabel: 'Registro de Entrada',
      inputPlaceholder: 'Escribe alguna nota ...',
      inputAttributes: {
        'aria-label': 'Escribe alguna nota',
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then(({ isConfirmed, value: description }) => {
      if (isConfirmed) {
        console.log('description is ', description);
        this.registerEntryAttendance(description);
      }
    });
  }

  alertExitAttendance() {
    Swal.fire({
      title: '¿Está seguro que desea salir?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.registerExitAttendance();
      }
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
