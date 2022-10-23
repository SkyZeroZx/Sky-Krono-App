import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CountdownModule } from 'ngx-countdown';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Util } from '../../common/utils/util';
import { AttendanceService } from '../../services/attendance/attendance.service';
import { ReporteService } from '../../services/report/report.service';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { AttendanceComponent } from './attendance.component';
import { AttendanceMock } from './attendance.mock.spec';
import { AttendanceRouter } from './attendance.routing';

fdescribe('AttedanceComponent', () => {
  let component: AttendanceComponent;
  let fixture: ComponentFixture<AttendanceComponent>;
  let attendanceService: AttendanceService;
  let scheduleService: ScheduleService;
  let crd: ChangeDetectorRef;
  let toastrService: ToastrService;
  const {
    dayIsValid,
    schedule: { entryHour, exitHour },
  } = AttendanceMock.scheduleByUser;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendanceComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NgbModule,
        CommonModule,
        CountdownModule,
        MatProgressSpinnerModule,
        RouterModule.forChild(AttendanceRouter),
        FormsModule,
        ReactiveFormsModule,
        SweetAlert2Module.forRoot(),
        ToastrModule.forRoot(),
      ],
      providers: [
        ToastrService,
        AttendanceService,
        ScheduleService,
        ChangeDetectorRef,
        ReporteService,
        FormBuilder,
        ReactiveFormsModule,
        { provide: ToastrService, useClass: ToastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceComponent);
    attendanceService = TestBed.inject(AttendanceService);
    scheduleService = TestBed.inject(ScheduleService);
    toastrService = TestBed.inject(ToastrService);
    crd = TestBed.inject(ChangeDetectorRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('AttedanceComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngAfterContentChecked', () => {
    // Get a reference to an instance of the private class
    const changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
    // spy on private class prototype
    const detectChangesSpy = spyOn(
      changeDetectorRef.constructor.prototype,
      'detectChanges',
    );
    component.ngAfterContentChecked();
    expect(detectChangesSpy).toHaveBeenCalled();
  });

  it('Validate ngAfterViewInit', () => {
    const spyGetScheduleByUser = spyOn(component, 'getScheduleByUser').and.callThrough();
    component.ngAfterViewInit();
    expect(spyGetScheduleByUser).toHaveBeenCalled();
  });

  it('Validate ngOnDestroy', () => {
    const spyClearInterval = spyOn(window, 'clearInterval').and.callThrough();
    component.ngOnDestroy();
    expect(spyClearInterval).toHaveBeenCalled();
    expect(component.initAnimation).toBeFalsy();
    expect(component.isActiveEntryAttendance).toBeFalsy();
    expect(component.spinnerValue).toEqual(101);
  });

  it('Validate getScheduleByUser OK', () => {
    const spyScheduleService = spyOn(
      scheduleService,
      'getScheduleByUser',
    ).and.returnValue(of(AttendanceMock.scheduleByUser));
    const spyTotalSecondsOfSchedule = spyOn(
      Util,
      'totalSecondsOfSchedule',
    ).and.returnValue(null);
    const spyGetAttendanceToday = spyOn(
      component,
      'getAttendanceToday',
    ).and.callThrough();
    component.getScheduleByUser();
    expect(spyScheduleService).toHaveBeenCalled();
    expect(component.dayIsValid).toEqual(dayIsValid);
    expect(spyTotalSecondsOfSchedule).toHaveBeenCalledWith(entryHour, exitHour);
    expect(component.userExitHour).toEqual(exitHour);
    expect(spyGetAttendanceToday).toHaveBeenCalled();
  });

  it('Validate getScheduleByUser ERROR', () => {
    const spyScheduleService = spyOn(
      scheduleService,
      'getScheduleByUser',
    ).and.returnValue(throwError(() => new Error('Error')));
    const spyToastrService = spyOn(toastrService, 'error').and.callThrough();
    component.getScheduleByUser();
    expect(spyScheduleService).toHaveBeenCalled();
    expect(spyToastrService).toHaveBeenCalled();
  });

  it('Validate getAttendanceToday OK', () => {
    const spyInitCountDown = spyOn(component, 'initCountDown').and.callThrough();
    const spyAttendanceService = spyOn(
      attendanceService,
      'getAttendanceByUser',
    ).and.returnValue(of(null));
    component.getAttendanceToday();
    expect(spyInitCountDown).toHaveBeenCalledWith(null);
    expect(spyAttendanceService).toHaveBeenCalled();
  });

  it('Validate getAttendanceToday ERROR', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyAttendanceService = spyOn(
      attendanceService,
      'getAttendanceByUser',
    ).and.returnValue(throwError(() => new Error('Error')));
    component.getAttendanceToday();
    expect(spyToastService).toHaveBeenCalled();
    expect(spyAttendanceService).toHaveBeenCalled();
  });

  it('Validate initCountDown', () => {
    // Case Attendance is null
    component.initCountDown(null);
    expect(component.isActiveEntryAttendance).toBeTruthy();
    // Validate exist Attendance
    const spyUtilRestSecondsOfDay = spyOn(Util, 'restSecondsOfDay').and.returnValue(1000);
    component.initCountDown(AttendanceMock.attendance);
    expect(component.initAnimation).toBeTruthy();
    expect(component.isActiveExitAttendance).toEqual(AttendanceMock.attendance.isActive);
    expect(spyUtilRestSecondsOfDay).toHaveBeenCalled();
    expect(component.countDownConfig).toEqual({
      leftTime: 1000,
    });
  });

  it('Validate restartCountDown', () => {
    const mockCoundownEvent: any = { action: 'restart' };
    const spyInitSpinner = spyOn(component, 'initSpinner').and.callThrough();
    component.restartCountdown(mockCoundownEvent);
    expect(spyInitSpinner).toHaveBeenCalled();
  });

  it('Validate initSpinner Attendance NOT ACTIVE', fakeAsync(() => {
    const spyisAttendanceActive = spyOn(
      component,
      'isAttendanceActive',
    ).and.callThrough();
    const spyRestSecondsOfDay = spyOn(Util, 'restSecondsOfDay').and.callThrough();
    const spyNgOnDestroy = spyOn(component, 'ngOnDestroy').and.callThrough();
    tick(20000);
    component.initSpinner();
    expect(spyRestSecondsOfDay).not.toHaveBeenCalled();
    expect(spyisAttendanceActive).toHaveBeenCalled();
    expect(spyNgOnDestroy).toHaveBeenCalled();
  }));

  it('Validate initSpinner Attendance ACTIVE', fakeAsync(() => {
    component.isActiveExitAttendance = true;
    component.totalSecondsOfSchedule = 100;
    const spyisAttendanceActive = spyOn(
      component,
      'isAttendanceActive',
    ).and.callThrough();
    const spyRestSecondsOfDay = spyOn(Util, 'restSecondsOfDay').and.returnValue(5);
    const spyNgOnDestroy = spyOn(component, 'ngOnDestroy').and.callThrough();
    component.initSpinner();
    tick(1002);

    expect(spyRestSecondsOfDay).toHaveBeenCalled();
    expect(component.spinnerValue).toEqual(95);
    expect(spyisAttendanceActive).toHaveBeenCalled();
    expect(spyNgOnDestroy).not.toHaveBeenCalled();

    // Destroy Set Interval for avoid problems
    component.ngOnDestroy();
  }));

  it('Validate initSpinner Attendance SPINNER >=100', fakeAsync(() => {
    component.isActiveExitAttendance = true;
    component.spinnerValue = 105;
    component.totalSecondsOfSchedule = 1000;
    const spyRestSecondsOfDay = spyOn(Util, 'restSecondsOfDay').and.returnValue(0);
    const spyNgOnDestroy = spyOn(component, 'ngOnDestroy').and.callThrough();
    component.initSpinner();
    tick(1002);
    expect(component.spinnerValue).toBeGreaterThanOrEqual(100);
    expect(spyNgOnDestroy).toHaveBeenCalled();
    expect(spyRestSecondsOfDay).toHaveBeenCalled();
    // Destroy Set Interval for avoid problems
    component.ngOnDestroy();
  }));

  it('Validate registerEntryAttendance OK', () => {
    const spyAttendanceService = spyOn(
      attendanceService,
      'registerEntryAttendance',
    ).and.returnValue(of(null));
    const spyGetScheduleByUser = spyOn(component, 'getScheduleByUser').and.callThrough();
    component.registerEntryAttendance(AttendanceMock.descriptionEntryAttendance);
    expect(spyGetScheduleByUser).toHaveBeenCalled();
    expect(component.isActiveEntryAttendance).toBeFalsy();
    expect(spyAttendanceService).toHaveBeenCalled();
  });

  it('Validate registerEntryAttendance ERROR', () => {
    const spyAttendanceService = spyOn(
      attendanceService,
      'registerEntryAttendance',
    ).and.returnValue(throwError(() => new Error('Error')));
    const spyToastrService = spyOn(toastrService, 'error').and.callThrough();
    component.registerEntryAttendance(AttendanceMock.descriptionEntryAttendance);
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyAttendanceService).toHaveBeenCalled();
  });

  it('Validate registerExitAttendance OK', () => {
    const spyAttendanceService = spyOn(
      attendanceService,
      'registerExitAttendance',
    ).and.returnValue(of(null));
    const spyNgOnDestroy = spyOn(component, 'ngOnDestroy').and.callThrough();
    component.registerExitAttendance();
    expect(spyNgOnDestroy).toHaveBeenCalled();
    expect(component.isActiveExitAttendance).toBeFalsy();
    expect(spyAttendanceService).toHaveBeenCalled();
  });

  it('Validate registerExitAttendance ERROR', () => {
    const spyAttendanceService = spyOn(
      attendanceService,
      'registerExitAttendance',
    ).and.returnValue(throwError(() => new Error('Error')));
    const spyToastrService = spyOn(toastrService, 'error').and.callThrough();
    component.registerExitAttendance();
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyAttendanceService).toHaveBeenCalled();
  });
});
