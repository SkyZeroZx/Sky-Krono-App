import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule, BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { getDatepickerConfig } from '../../../../common/config/Datepicker';
import { Constant } from '../../../../common/constants/Constant';
import { filterAttendanceReport } from '../../../../common/pipes/filter-attendance-report.pipe';
import { AttendanceService } from '../../../../services/attendance/attendance.service';
import { ReporteService } from '../../../../services/report/report.service';
import { UserService } from '../../../../services/users/user.service';
import { ManageUsersMock } from '../manage-users/manage-users.mock.spec';
import { ReportAttendanceComponent } from './report-attendance.component';
import { ReportAttendanceMock } from './report-attendance.mock.spec';
import { ReportAttendanceRouter } from './report-attendance.routing';

fdescribe('ReportAttendanceComponent', () => {
  let component: ReportAttendanceComponent;
  let fixture: ComponentFixture<ReportAttendanceComponent>;
  let reporteService: ReporteService;
  let toastrService: ToastrService;
  let userService: UserService;
  let attendanceService: AttendanceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportAttendanceComponent, filterAttendanceReport],
      imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        BsDatepickerModule.forRoot(),
        NgSelectModule,
        RouterModule.forChild(ReportAttendanceRouter),
      ],
      providers: [
        DatePipe,
        ToastrService,
        ReporteService,
        UserService,
        AttendanceService,
        FormBuilder,
        { provide: ToastrService, useClass: ToastrService },
        { provide: BsDaterangepickerConfig, useFactory: getDatepickerConfig },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAttendanceComponent);
    component = fixture.componentInstance;
    reporteService = TestBed.inject(ReporteService);
    toastrService = TestBed.inject(ToastrService);
    userService = TestBed.inject(UserService);
    attendanceService = TestBed.inject(AttendanceService);
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateFormSchedule = spyOn(component, 'createForm').and.callThrough();
    const spyGetAllUsers = spyOn(component, 'getAllUsers').and.callThrough();
    const spyOnValueChangesFormGroup = spyOn(
      component,
      'onValueChangesFromGroup',
    ).and.callThrough();

    component.ngOnInit();
    expect(spyCreateFormSchedule).toHaveBeenCalled();
    expect(spyGetAllUsers).toHaveBeenCalled();
    expect(spyOnValueChangesFormGroup).toHaveBeenCalled();
  });

  it('Validate getAllUsers OK', () => {
    const spyUserService = spyOn(userService, 'getAllUsers').and.returnValue(
      of(ManageUsersMock.listUsersMock),
    );
    component.getAllUsers();
    expect(component.listUsers).toEqual(ManageUsersMock.listUsersMock);
    expect(spyUserService).toHaveBeenCalled();
  });

  it('Validate getAllUsers ERROR', () => {
    const spyUserService = spyOn(userService, 'getAllUsers').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    component.getAllUsers();
    expect(spyUserService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate exportPdf', () => {
    Constant.REPORT = ManageUsersMock.listUsersMock;
    const spyExportAsPDF = spyOn(reporteService, 'exportAsPDF').and.callThrough();
    component.exportPdf();
    expect(spyExportAsPDF).toHaveBeenCalled();
  });

  it('Validate onValueChangesFromGroup', () => {
    const spyReportAttendanceByUser = spyOn(
      component,
      'reportAttendanceByUser',
    ).and.callThrough();
    component.reportAttendanceForm.patchValue({
      dateRange: [new Date(), new Date()],
      status: 'MOCK',
      id: '1',
    });
    fixture.detectChanges();
    expect(spyReportAttendanceByUser).toHaveBeenCalled();
    component.reportAttendanceForm.reset();
    fixture.detectChanges();
    expect(spyReportAttendanceByUser).toHaveBeenCalledTimes(1);
  });

  it('Validate reportAttendanceByUser OK', () => {
    const spyAttendanceService = spyOn(
      attendanceService,
      'getAttendanceReport',
    ).and.returnValue(of(ReportAttendanceMock.listReportAttendance));
    component.reportAttendanceByUser();
    expect(spyAttendanceService).toHaveBeenCalled();
    expect(component.listAttendance).toEqual(ReportAttendanceMock.listReportAttendance);
  });

  it('Validate reportAttendanceByUser ERROR', () => {
    const spyToastError = spyOn(toastrService, 'error').and.callThrough();
    const spyAttendanceServiceError = spyOn(
      attendanceService,
      'getAttendanceReport',
    ).and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    component.reportAttendanceByUser();
    expect(spyAttendanceServiceError).toHaveBeenCalled();
    expect(spyToastError).toHaveBeenCalled();
  });
});
