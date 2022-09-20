import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { ReporteService } from '../../services/report/report.service';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { ScheduleComponent } from './schedule.component';
import { ScheduleMock } from './schedule.mock.spec';
import { ScheduleRouter } from './schedule.routing';

fdescribe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;
  let reporteService: ReporteService;
  let scheduleService: ScheduleService;
  let toastrService: ToastrService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterModule.forChild(ScheduleRouter),
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
      ],
      providers: [
        ToastrService,
        ScheduleService,
        ReporteService,
        FormBuilder,
        ReactiveFormsModule,
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    reporteService = TestBed.inject(ReporteService);
    scheduleService = TestBed.inject(ScheduleService);
    toastrService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ScheduleComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyGetAllSchedule = spyOn(component, 'getAllSchedule').and.callThrough();
    component.ngOnInit();
    expect(spyGetAllSchedule).toHaveBeenCalled();
  });

  it('Validate getAllSchedule OK', () => {
    const spyScheduleService = spyOn(scheduleService, 'getAllSchedule').and.returnValue(
      of(ScheduleMock.mockListSchedule),
    );
    component.getAllSchedule();
    expect(spyScheduleService).toHaveBeenCalled();
    expect(component.listSchedule).toEqual(ScheduleMock.mockListSchedule);
    expect(component.listScheduleOk).toBeTruthy();
  });

  it('Validate getAllSchedule Error', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyScheduleService = spyOn(scheduleService, 'getAllSchedule').and.returnValue(
      throwError(() => {
        new Error('Error Service');
      }),
    );
    component.getAllSchedule();
    expect(spyScheduleService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate alertUpdateNotification', fakeAsync(async () => {
    // Case Notifications Enabled
    const spySweetAlert = spyOn(Swal, 'fire').and.callThrough();
    const spyUpdateNotificationService = spyOn(
      component,
      'updateNotification',
    ).and.callThrough();
    component.alertUpdateNotification(ScheduleMock.mockScheduleNotificationEnabled);
    tick(1000);
    expect(Swal.isVisible()).toBeTruthy();
    Swal.clickConfirm();
    tick(1000);
    expect(spySweetAlert).toHaveBeenCalled();
    expect(Swal.getTitle().textContent).toEqual('Deshabilitar');
    expect(spyUpdateNotificationService).toHaveBeenCalledWith(
      ScheduleMock.mockScheduleNotificationEnabled,
    );
    // Case Notifications Disabled

    component.alertUpdateNotification(ScheduleMock.mockScheduleNotificationDisabled);
    tick(1000);
    expect(Swal.isVisible()).toBeTruthy();
    Swal.clickConfirm();
    tick(1000);
    expect(spySweetAlert).toHaveBeenCalledTimes(2);
    expect(Swal.getTitle().textContent).toEqual('Habilitar');
    expect(spyUpdateNotificationService).toHaveBeenCalledWith(
      ScheduleMock.mockScheduleNotificationDisabled,
    );
  }));

  it('Validate alertDeleteSchedule', fakeAsync(async () => {
    const spySweetAlert = spyOn(Swal, 'fire').and.callThrough();
    const spyDeleteSchedule = spyOn(component, 'deleteSchedule').and.callThrough();
    component.alertDeleteSchedule(ScheduleMock.mockScheduleDelete);
    tick(1000);
    expect(Swal.isVisible()).toBeTruthy();
    Swal.clickConfirm();
    tick(1000);
    expect(spySweetAlert).toHaveBeenCalled();
    expect(Swal.getTitle().textContent).toEqual('Eliminar Horario');
    expect(spyDeleteSchedule).toHaveBeenCalledWith(ScheduleMock.mockScheduleDelete.id);
  }));

  it('Validate showModalCreateSchedule', () => {
    const spyShowModal = spyOn(component.modalCreateSchedule, 'show').and.callThrough();
    component.showModalCreateSchedule();
    expect(component.showModalCreateScheduleOk).toBeTruthy();
    expect(spyShowModal).toHaveBeenCalled();
  });

  it('Validate showModalUpdateSchedule', () => {
    const spyShowModal = spyOn(component.modalUpdateSchedule, 'show').and.callThrough();
    component.showModalUpdateSchedule(ScheduleMock.mockListSchedule[0]);
    expect(component.showModalUpdateScheduleOk).toBeTruthy();
    expect(component.selectedSchedule).toEqual(ScheduleMock.mockListSchedule[0]);
    expect(spyShowModal).toHaveBeenCalled();
  });

  it('Validate UpdateNotification OK', () => {
    const spyUpdateSchedule = spyOn(scheduleService, 'updateSchedule').and.returnValue(
      of(ScheduleMock.responseOk),
    );
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    component.updateNotification(ScheduleMock.mockScheduleUpdate);
    expect(spyUpdateSchedule).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate UpdateNotification Error', () => {
    const spyUpdateSchedule = spyOn(scheduleService, 'updateSchedule').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    component.updateNotification(ScheduleMock.mockScheduleUpdate);
    expect(spyUpdateSchedule).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate deleteSchedule OK', () => {
    const spyGetAllSchedule = spyOn(scheduleService, 'getAllSchedule').and.callThrough();
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    const spyScheduleService = spyOn(scheduleService, 'deleteSchedule').and.returnValue(
      of(ScheduleMock.responseOk),
    );
    component.deleteSchedule(ScheduleMock.mockScheduleDelete.id);
    expect(spyGetAllSchedule).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
    expect(spyScheduleService).toHaveBeenCalledWith(ScheduleMock.mockScheduleDelete.id);
  });

  it('Validate deleteSchedule ERROR', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyScheduleService = spyOn(scheduleService, 'deleteSchedule').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    component.deleteSchedule(ScheduleMock.mockScheduleDelete.id);
    expect(spyToastService).toHaveBeenCalled();
    expect(spyScheduleService).toHaveBeenCalledWith(ScheduleMock.mockScheduleDelete.id);
  });
});
