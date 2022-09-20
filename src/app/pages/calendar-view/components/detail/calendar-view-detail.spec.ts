import { defineFullCalendarElement } from '@fullcalendar/web-component';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { of, throwError } from 'rxjs';
import { TaskService } from '../../../../services/task/task.service';
import { CalendarViewComponent } from '../../calendar-view.component';
import { CalendarViewerMock } from '../../calendar-view.mock.spec';
import { CalendarViewRouter } from '../../calendar-view.routing';
import { CalendarViewDetailComponent } from './calendar-view-detail..component';
import { NgSelectModule } from '@ng-select/ng-select';

fdescribe('CalendarViewDetailComponent', () => {
  let component: CalendarViewDetailComponent;
  let fixture: ComponentFixture<CalendarViewDetailComponent>;
  let taskService: TaskService;
  let toastrService: ToastrService;
  let mockClickArg: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarViewDetailComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterModule.forChild(CalendarViewRouter),
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
      ],
      providers: [
        DatePipe,
        ToastrService,
        TaskService,
        FormBuilder,
        ReactiveFormsModule,
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(CalendarViewDetailComponent);
    toastrService = TestBed.inject(ToastrService);
    taskService = TestBed.inject(TaskService);
    component = fixture.componentInstance;
    component.taskSelected = mockClickArg;
    fixture.detectChanges();
  });

  it('CalendarViewDetailComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateFormViewTask = spyOn(
      component,
      'createFormViewTask',
    ).and.callThrough();
    const spyGetUsersByTask = spyOn(component, 'getUsersByTask').and.callThrough();
    const spyGetAllTypes = spyOn(component, 'getAllTypes').and.callThrough();
    component.ngOnInit();
    expect(spyCreateFormViewTask).toHaveBeenCalled();
    expect(spyGetUsersByTask).toHaveBeenCalled();
    expect(spyGetAllTypes).toHaveBeenCalled();
  });

  it('Validate getAllTypes OK', () => {
    const spyTaskService = spyOn(taskService, 'getAllTypes').and.returnValue(
      of(CalendarViewerMock.listTypes),
    );
    const spyViewFormDisabled = spyOn(
      component.viewForm.controls.codType,
      'disable',
    ).and.callThrough();
    component.getAllTypes();
    expect(component.listTypes).toEqual(CalendarViewerMock.listTypes);
    expect(spyTaskService).toHaveBeenCalled();
    expect(spyViewFormDisabled).toHaveBeenCalled();
  });

  it('Validate getAllTypes Error', () => {
    const spyTaskService = spyOn(taskService, 'getAllTypes').and.returnValue(
      throwError(() => new Error('ERROR')),
    );
    const spyToastrService = spyOn(toastrService, 'error').and.callThrough();
    component.getAllTypes();
    expect(spyTaskService).toHaveBeenCalled();
    expect(spyToastrService).toHaveBeenCalled();
  });

  it('Validate getUsersByTask OK', () => {
    const spyTaskService = spyOn(taskService, 'getUsersByTask').and.returnValue(
      of(CalendarViewerMock.usersByTask),
    );
    const spyFormSetValue = spyOn(
      component.viewForm.controls.users,
      'setValue',
    ).and.callThrough();
    const spyFormDisabled = spyOn(
      component.viewForm.controls.users,
      'disable',
    ).and.callThrough();
    component.getUsersByTask();
    expect(spyTaskService).toHaveBeenCalled();
    expect(component.listUsers).toEqual(CalendarViewerMock.usersByTask);
    expect(spyFormSetValue).toHaveBeenCalledWith(CalendarViewerMock.usersByTask);
    expect(spyFormDisabled).toHaveBeenCalled();
  });

  it('Validate getUsersByTask ERROR', () => {
    const spyTaskService = spyOn(taskService, 'getUsersByTask').and.returnValue(
      throwError(() => new Error('ERROR')),
    );
    const spyToastrService = spyOn(toastrService, 'error').and.callThrough();
    component.getUsersByTask();
    expect(spyTaskService).toHaveBeenCalled();
    expect(spyToastrService).toHaveBeenCalled();
  });
});
