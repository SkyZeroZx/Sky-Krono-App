import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Constant } from '../../common/constants/Constant';
import { StatusAttendance } from '../../common/interfaces';
import { Util } from '../../common/utils/util';
import { AttendanceService } from '../../services/attendance/attendance.service';
import { HomeComponent } from './home.component';
import { HomeMock } from './home.mock.spec';
import { HomeRouter } from './home.routing';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let toastrService: ToastrService;
  let attendanceService: AttendanceService;
  const { currentDate, listHistoryStatusAttendance } = HomeMock.attendanceHistoryUser;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterModule.forChild(HomeRouter),
        ToastrModule.forRoot(),
      ],
      providers: [
        ToastrService,
        AttendanceService,
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    toastrService = TestBed.inject(ToastrService);
    attendanceService = TestBed.inject(AttendanceService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('HomeComponent create', () => {
    expect(component).toBeTruthy();
    expect(component.totalDaysOfWeek).toEqual(Constant.TOTAL_DAY_OF_WEEK);
  });

  it('Validate ngAfterViewInit', () => {
    const spyGetHistoryAttendanceUser = spyOn(
      attendanceService,
      'getHistoryAttendanceUser',
    ).and.callThrough();
    component.ngAfterViewInit();
    expect(spyGetHistoryAttendanceUser).toHaveBeenCalled();
  });

  it('Validate getHistoryAttendanceUser OK', () => {
    const spyGetDataWeeks = spyOn(component, 'getDataWeeks').and.callThrough();
    const spyTotalDaysStatus = spyOn(component, 'totalDaysStatus').and.callThrough();
    const spyGetHistoryAttendanceUser = spyOn(
      attendanceService,
      'getHistoryAttendanceUser',
    ).and.returnValue(of(HomeMock.attendanceHistoryUser));
    component.getHistoryAttendanceUser();
    expect(spyGetDataWeeks).toHaveBeenCalled();
    expect(spyTotalDaysStatus).toHaveBeenCalled();
    expect(spyGetHistoryAttendanceUser).toHaveBeenCalled();
  });

  it('Validate getHistoryAttendanceUser ERROR', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyGetHistoryAttendanceUser = spyOn(
      attendanceService,
      'getHistoryAttendanceUser',
    ).and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    component.getHistoryAttendanceUser();
    expect(spyGetHistoryAttendanceUser).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate getDataWeeks', () => {
    const spyUtilCurrentDayOfWeek = spyOn(Util, 'currentDayOfWeek').and.callThrough();
    const spyValidLastAttendance = spyOn(
      component,
      'validLastAttendance',
    ).and.callThrough();
    const spygetRestDaysOfWeek = spyOn(Util, 'getRestDaysOfWeek').and.callThrough();
    component.getDataWeeks(currentDate, listHistoryStatusAttendance);
    expect(spyUtilCurrentDayOfWeek).toHaveBeenCalledWith(currentDate);
    expect(spygetRestDaysOfWeek).toHaveBeenCalled();
    expect(spyValidLastAttendance).toHaveBeenCalledWith(listHistoryStatusAttendance);
    expect(component.lastWeek).toEqual(HomeMock.lastWeekMock);
    expect(component.currrentWeek).toEqual(HomeMock.currentWeekMock);
  });

  it('Validate validLastAttendance', () => {
    component.currentDate = '2022-09-18 14:48';
    component.dayOfWeek = Util.currentDayOfWeek(currentDate);
    const listReverse = [...HomeMock.listValidateLastAttendanceMock.reverse()];
    component.validLastAttendance(listReverse);
    expect(component.dayOfWeek).toEqual(6);
  });

  it('Validate getClassStatus ', () => {
    // Case isAbsent true
    const mockStatusAttendance: StatusAttendance = {
      isAbsent: true,
      isDayOff: false,
      isLater: false,
      isActive: false,
      date: '',
    };
    expect(component.getClassStatus(mockStatusAttendance)).toEqual(
      'fa-solid fa-minus absent',
    );
    mockStatusAttendance.isDayOff = true;
    mockStatusAttendance.isAbsent = false;
    //Case isDayOff is true
    expect(component.getClassStatus(mockStatusAttendance)).toEqual('disabled');

    // Case isLater true
    mockStatusAttendance.isAbsent = false;
    mockStatusAttendance.isDayOff = false;
    mockStatusAttendance.isLater = true;
    expect(component.getClassStatus(mockStatusAttendance)).toEqual(
      'fa-solid fa-exclamation warning',
    );
    //Case OnTime is AttendanceOk
    mockStatusAttendance.isAbsent = false;
    mockStatusAttendance.isDayOff = false;
    mockStatusAttendance.isLater = false;
    expect(component.getClassStatus(mockStatusAttendance)).toEqual(
      'fa-solid fa-check success',
    );
  });
});
