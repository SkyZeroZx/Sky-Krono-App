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
import { CreateScheduleComponent } from './create-schedule.component';

fdescribe('CreateScheduleComponent', () => {
  let component: CreateScheduleComponent;
  let fixture: ComponentFixture<CreateScheduleComponent>;
  let scheduleService: ScheduleService;
  let toastrService: ToastrService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateScheduleComponent],
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
    fixture = TestBed.createComponent(CreateScheduleComponent);
    scheduleService = TestBed.inject(ScheduleService);
    toastrService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CreateScheduleComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateFormSchedule = spyOn(
      component,
      'createFormSchedule',
    ).and.callThrough();
    component.ngOnInit();
    expect(spyCreateFormSchedule).toHaveBeenCalled();
  });

  it('Validate createSchedule OK', () => {
    const spyscheduleService = spyOn(scheduleService, 'createSchedule').and.returnValue(
      of(null),
    );
    const spyFormReset = spyOn(component.createScheduleForm, 'reset').and.callThrough();
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    const spyCloseEvent = spyOn(component.close, 'emit').and.callThrough();
    const spyUtilFormatDateToHour = spyOn(Util, 'formatDateToHour').and.returnValue(null);
    component.createSchedule();

    expect(spyscheduleService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
    expect(spyFormReset).toHaveBeenCalled();
    expect(spyCloseEvent).toHaveBeenCalled();
    expect(spyUtilFormatDateToHour).toHaveBeenCalledTimes(2);
  });

  it('Validate createSchedule ERROR', () => {
    const spyscheduleService = spyOn(scheduleService, 'createSchedule').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();

    const spyUtilFormatDateToHour = spyOn(Util, 'formatDateToHour').and.returnValue(null);
    component.createSchedule();

    expect(spyscheduleService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
    expect(spyUtilFormatDateToHour).toHaveBeenCalledTimes(2);
  });
});
