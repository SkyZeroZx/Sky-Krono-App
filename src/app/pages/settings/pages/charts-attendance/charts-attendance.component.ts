import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '@service/attendance/attendance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { listLocales } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ListChartReport, SearchChartReport, User } from '@core/interfaces';
import { UserService } from '@service/users/user.service';

@Component({
  selector: 'app-charts-attendance',
  templateUrl: './charts-attendance.component.html',
  styleUrls: ['./charts-attendance.component.scss'],
})
export class ChartsAttendanceComponent implements OnInit {
  locale = 'es';
  locales = listLocales();
  chartsForm: FormGroup;
  maxDate = new Date();
  initDate = new Date(
    this.maxDate.getFullYear(),
    this.maxDate.getMonth(),
    this.maxDate.getDate() - 3,
  );
  listChartReport: ListChartReport = {
    listDays: [],
    listLater: [],
    listOnTime: [],
    listAbsent: [],
    listLicence: [],
    totalLater: 0,
    totalOnTime: 0,
    totalAbsent: 0,
    totalLicence: 0,
  };
  listUsers: User[] = [];

  constructor(
    private attendanceService: AttendanceService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private userService: UserService,
  ) {
    this.localeService.use(this.locale);
  }

  ngOnInit(): void {
    this.createFormChart();
    this.getAllUsers();
    this.suscribeChangeValuesForm();
    this.getChartsAttendance([this.initDate, this.maxDate]);
  }

  createFormChart() {
    this.chartsForm = this.fb.group({
      dateRange: [
        [this.initDate, this.maxDate],
        Validators.compose([Validators.required]),
      ],
      id: [null],
    });
  }

  suscribeChangeValuesForm() {
    this.chartsForm.valueChanges.subscribe(({ id, dateRange }) => {
      if (id) {
        this.getChartsByUser(id, dateRange);
      } else {
        this.getChartsAttendance(dateRange);
      }
    });
  }

  getChartsAttendance(dateRange: Date[] | string[]) {
    const searchChartReport: SearchChartReport = {
      dateRange: dateRange,
    };
    this.attendanceService.getChartsAttendance(searchChartReport).subscribe({
      next: (res) => {
        this.listChartReport = res;
      },
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.listUsers = res;
      },
    });
  }

  getChartsByUser(id: number, dateRange: Date[] | string[]) {
    const searchChartReport: SearchChartReport = {
      dateRange,
      id,
    };
    this.attendanceService.getChartsAttendanceByUser(searchChartReport).subscribe({
      next: (res) => {
        this.listChartReport = res;
      },
    });
  }
}
