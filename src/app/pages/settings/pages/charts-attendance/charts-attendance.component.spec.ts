import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgChartsModule } from 'ng2-charts';
import { BsDatepickerModule, BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { getDatepickerConfig } from '@core/config/datepicker.config';
import { AttendanceService } from '@service/attendance/attendance.service';
import { UserService } from '@service/users/user.service';
import { ChartsAttendanceComponent } from './charts-attendance.component';
import { ChartsAttendanceRouter } from './charts-attendance.routing';
import { BarAttendanceComponent } from './components/bar-attendance/bar-attendance.component';
import { CardsAttendanceComponent } from './components/cards-attendance/cards-attendance.component';
import { PieAttendanceComponent } from './components/pie-attendance/pie-attendance.component';
import { PolarAttendanceComponent } from './components/polar-attendance/polar-attendance.component';
import { of } from 'rxjs';
import { ChartsAttendanceMock } from './charts-attendance.mock.spec';

fdescribe('ChartsAttendanceComponent', () => {
  let component: ChartsAttendanceComponent;
  let fixture: ComponentFixture<ChartsAttendanceComponent>;
  let attendanceService: AttendanceService;
  let userService: UserService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ChartsAttendanceComponent,
        BarAttendanceComponent,
        PieAttendanceComponent,
        CardsAttendanceComponent,
        PolarAttendanceComponent,
      ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        CommonModule,
        NgChartsModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        BsDatepickerModule.forRoot(),
        ToastrModule.forRoot(),
        RouterModule.forChild(ChartsAttendanceRouter),
      ],
      providers: [
        DatePipe,
        ToastrService,
        FormBuilder,
        { provide: BsDaterangepickerConfig, useFactory: getDatepickerConfig },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsAttendanceComponent);
    component = fixture.componentInstance;
    attendanceService = TestBed.inject(AttendanceService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateFormChart = spyOn(component, 'createFormChart').and.callThrough();
    const spyGetAllUsers = spyOn(component, 'getAllUsers').and.callThrough();
    const spySuscribeChangeValuesForm = spyOn(
      component,
      'suscribeChangeValuesForm',
    ).and.callThrough();
    const spyGetChartsAttendance = spyOn(
      component,
      'getChartsAttendance',
    ).and.callThrough();
    component.ngOnInit();
    expect(spyCreateFormChart).toHaveBeenCalled();
    expect(spyGetAllUsers).toHaveBeenCalled();
    expect(spySuscribeChangeValuesForm).toHaveBeenCalled();
    expect(spyGetAllUsers).toHaveBeenCalled();
    expect(spyGetChartsAttendance).toHaveBeenCalled();
  });

  it('Validate suscribeChangeValuesForm search user by id', () => {
    const spyGetChartsAttendance = spyOn(
      component,
      'getChartsAttendance',
    ).and.callThrough();
    const spyGetChartsByUser = spyOn(component, 'getChartsByUser').and.callThrough();
    component.chartsForm.patchValue({
      id: 1,
      dateRange: [new Date(), new Date()],
    });
    fixture.detectChanges();
    expect(spyGetChartsByUser).toHaveBeenCalled();
    expect(spyGetChartsAttendance).not.toHaveBeenCalled();
  });

  it('Validate suscribeChangeValuesForm search only by dateRange', () => {
    const spyGetChartsAttendance = spyOn(
      component,
      'getChartsAttendance',
    ).and.callThrough();
    const spyGetChartsByUser = spyOn(component, 'getChartsByUser').and.callThrough();
    component.chartsForm.patchValue({
      id: null,
      dateRange: [new Date(), new Date()],
    });
    fixture.detectChanges();
    expect(spyGetChartsByUser).not.toHaveBeenCalled();
    expect(spyGetChartsAttendance).toHaveBeenCalled();
  });

  it('Validate getChartsAttendance Ok', () => {
    const spyAttendanceService = spyOn(
      attendanceService,
      'getChartsAttendance',
    ).and.returnValue(of(ChartsAttendanceMock.listChartReport));
    component.getChartsAttendance(ChartsAttendanceMock.searchChartReport.dateRange);
    expect(spyAttendanceService).toHaveBeenCalled();
    expect(component.listChartReport).toEqual(ChartsAttendanceMock.listChartReport);
  });

  it('Validate getAllUsers Ok', () => {
    const spyUserService = spyOn(userService, 'getAllUsers').and.returnValue(of(null));
    component.getAllUsers();
    expect(spyUserService).toHaveBeenCalled();
    expect(component.listUsers).toEqual(null);
  });

  it('Validate getChartsAttendanceByUser Ok', () => {
    const spyGetChartsAttendanceByUser = spyOn(
      attendanceService,
      'getChartsAttendanceByUser',
    ).and.returnValue(of(ChartsAttendanceMock.listChartReport));
    component.getChartsByUser(
      ChartsAttendanceMock.searchChartReport.id,
      ChartsAttendanceMock.searchChartReport.dateRange,
    );
    expect(spyGetChartsAttendanceByUser).toHaveBeenCalled();
  });
});
