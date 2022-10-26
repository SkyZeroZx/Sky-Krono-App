import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { listLocales } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { ReportAttendance, User } from '../../../../common/interfaces';
import { AttendanceService } from '../../../../services/attendance/attendance.service';
import { ReporteService } from '../../../../services/report/report.service';
import { UserService } from '../../../../services/users/user.service';

@Component({
  selector: 'app-report-attendance',
  templateUrl: './report-attendance.component.html',
  styleUrls: ['./report-attendance.component.scss'],
})
export class ReportAttendanceComponent implements OnInit {
  locale = 'es';
  locales = listLocales();
  p = 1;
  reportAttendanceForm: FormGroup;
  listAttendance: ReportAttendance[] = [];
  listUsers: User[];

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private localeService: BsLocaleService,
    private reporteService: ReporteService,
    private userService: UserService,
    private toastrService: ToastrService,
  ) {
    this.localeService.use(this.locale);
  }

  ngOnInit(): void {
    this.createForm();
    this.getAllUsers();
    this.onValueChangesFromGroup();
  }

  createForm() {
    this.reportAttendanceForm = this.fb.group({
      dateRange: ['', Validators.required],
      status: [''],
      id: [null, Validators.required],
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.listUsers = res;
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al listar los usuarios');
      },
    });
  }

  onValueChangesFromGroup(): void {
    this.reportAttendanceForm.valueChanges.subscribe((_values) => {
      if (this.reportAttendanceForm.valid) {
        this.reportAttendanceByUser();
      }
    });
  }

  reportAttendanceByUser() {
    this.attendanceService
      .getAttendanceReport(this.reportAttendanceForm.value)
      .subscribe({
        next: (res) => {
          this.listAttendance = res;
        },
        error: (_err) => {
          this.toastrService.error('Sucedio un error al listar asistencias');
        },
      });
  }

  exportPdf() {
    const headers = ['DESCRIPCION', 'FECHA', 'ESTADO', 'EMPLEADO' , 'ENTRADA' , 'SALIDA' ];
    this.reporteService.exportAsPDF('REPORTE ASISTENCIAS', headers);
  }
}
