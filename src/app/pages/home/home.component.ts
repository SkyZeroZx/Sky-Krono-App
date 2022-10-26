import { AfterViewInit, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StatusAttendance } from '../../common/interfaces';
import { Util } from '../../common/utils/util';
import { Constant } from '../../common/constants/Constant';
import { AttendanceService } from '../../services/attendance/attendance.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  currentDate: string;
  readonly totalDaysOfWeek: number = Constant.TOTAL_DAY_OF_WEEK;
  currrentWeek: StatusAttendance[] = [];
  lastWeek: StatusAttendance[] = [];
  restDaysOfWeek: Date[] = [];
  dayOfWeek: number;
  totalDaysLater: number = 0;
  totalDaysAbsent: number = 0;
  totalDayOff: number = 0;

  constructor(
    private attendanceService: AttendanceService,
    private toastrService: ToastrService,
  ) {}

  ngAfterViewInit(): void {
    this.getHistoryAttendanceUser();
  }

  getHistoryAttendanceUser(): void {
    this.attendanceService.getHistoryAttendanceUser().subscribe({
      next: ({ currentDate, listHistoryStatusAttendance }) => {
        this.getDataWeeks(currentDate, listHistoryStatusAttendance);
        this.totalDaysStatus();
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al obtener el historial');
      },
    });
  }

  getDataWeeks(
    currentDate: string,
    listHistoryStatusAttendance: StatusAttendance[],
  ): void {
    this.currentDate = currentDate;
    this.dayOfWeek = Util.currentDayOfWeek(currentDate);
    this.validLastAttendance(listHistoryStatusAttendance);
    this.currrentWeek = listHistoryStatusAttendance.slice(0, this.dayOfWeek).reverse();
    this.lastWeek = listHistoryStatusAttendance
      .slice(this.dayOfWeek, this.dayOfWeek + this.totalDaysOfWeek)
      .reverse();

    this.restDaysOfWeek = Util.getRestDaysOfWeek(
      this.currrentWeek.at(-1),
      this.dayOfWeek,
    );
  }

  validLastAttendance([lastAttendance]: StatusAttendance[]): void {
    if (lastAttendance.date.substring(0, 10) !== this.currentDate.substring(0, 10)) {
      this.dayOfWeek--;
    }
  }

  totalDaysStatus(): void {
    const totalHistory = this.currrentWeek.concat(this.lastWeek);

    this.totalDaysLater = totalHistory.filter(({ isLater }) => isLater).length;

    this.totalDaysAbsent = totalHistory.filter(({ isAbsent }) => isAbsent).length;

    this.totalDayOff = totalHistory.filter(({ isDayOff }) => isDayOff).length;
  }

  getClassStatus({ isAbsent, isLater, isDayOff }: StatusAttendance): string {
    if (isAbsent) {
      return 'fa-solid fa-minus absent';
    }

    if (isDayOff) {
      return 'disabled';
    }

    if (isLater) {
      return 'fa-solid fa-exclamation warning';
    }

    return 'fa-solid fa-check success';
  }
}
