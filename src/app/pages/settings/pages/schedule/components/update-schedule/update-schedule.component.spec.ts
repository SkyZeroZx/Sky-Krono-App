import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Util } from '../../../../../../common/utils/util';
import { ReporteService } from '../../../../../../services/report/report.service';
import { ScheduleService } from '../../../../../../services/schedule/schedule.service';
import { ScheduleMock } from '../../schedule.mock.spec';
import { UpdateScheduleComponent } from './update-schedule.component';

fdescribe('UpdateScheduleComponent', () => {
  let component: UpdateScheduleComponent;
  let fixture: ComponentFixture<UpdateScheduleComponent>;
  let scheduleService: ScheduleService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateScheduleComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        ButtonsModule.forRoot(),
        ReactiveFormsModule,
        TimepickerModule.forRoot(),
        ToastrModule.forRoot(),
      ],
      providers: [
        ScheduleService,
        ToastrService,
        ReporteService,
        FormBuilder,
        NgbActiveModal,
        NgbModal,
        ReactiveFormsModule,
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateScheduleComponent);
    scheduleService = TestBed.inject(ScheduleService);
    toastrService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    component.inputSchedule = ScheduleMock.mockListSchedule[0];
    fixture.detectChanges();
  });

  it('should UpdateScheduleComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateEditScheduleForm = spyOn(
      component,
      'createEditScheduleForm',
    ).and.callThrough();
    component.ngOnInit();
    expect(spyCreateEditScheduleForm).toHaveBeenCalled();
  });

  it('Validate updateSchedule OK', () => {
    const spyscheduleService = spyOn(scheduleService, 'updateSchedule').and.returnValue(
      of(null),
    );
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    const spyCloseEvent = spyOn(component.close, 'emit').and.callThrough();
    const spyUtilFormatDateToHour = spyOn(Util, 'formatDateToHour').and.returnValue(null);
    component.updateSchedule();

    expect(spyscheduleService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
    expect(spyCloseEvent).toHaveBeenCalled();
    expect(spyUtilFormatDateToHour).toHaveBeenCalledTimes(2);
  });

  it('Validate updateSchedule ERROR', () => {
    const spyscheduleService = spyOn(scheduleService, 'updateSchedule').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();

    const spyUtilFormatDateToHour = spyOn(Util, 'formatDateToHour').and.returnValue(null);
    component.updateSchedule();

    expect(spyscheduleService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
    expect(spyUtilFormatDateToHour).toHaveBeenCalledTimes(2);
  });
});
