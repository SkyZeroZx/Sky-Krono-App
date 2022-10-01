import { CalendarOptions, defineFullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { TaskService } from '../../../../services/task/task.service';
import { CreateTaskComponent } from './create-task.component';
import { CalendarAdminRouter } from '../../calendar-admin.routing';
import { UserService } from '../../../../services/users/user.service';
import { CalendarViewerMock } from '../../../calendar-view/calendar-view.mock.spec';
import { ManageUsersMock } from '../../../settings/pages/manage-users/manage-users.mock.spec';

fdescribe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let taskService: TaskService;
  let toastrService: ToastrService;
  let bsLocaleService: BsLocaleService;
  let userService: UserService;
  let mockDateSelect: any = {
    allDay: true,
    start: new Date(),
    end: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTaskComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        NgSelectModule,
        CommonModule,
        RouterModule.forChild(CalendarAdminRouter),
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
      ],
      providers: [
        DatePipe,
        ToastrService,
        UserService,
        BsLocaleService,
        TaskService,
        FormBuilder,
        ReactiveFormsModule,
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(CreateTaskComponent);
    toastrService = TestBed.inject(ToastrService);
    taskService = TestBed.inject(TaskService);
    bsLocaleService = TestBed.inject(BsLocaleService);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    component.inputDateSelected = mockDateSelect;
    fixture.detectChanges();
  });

  it('CreateTaskComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateFormTask = spyOn(component, 'createFormTask').and.callThrough();
    const spyGetAllUsers = spyOn(component, 'getAllUsers').and.callThrough();
    const spySelectDetail = spyOn(component, 'selectDetail').and.callThrough();
    component.ngOnInit();
    expect(spyCreateFormTask).toHaveBeenCalled();
    expect(spyGetAllUsers).toHaveBeenCalled();
    expect(spySelectDetail).toHaveBeenCalled();
  });

  it('Validate selectDetail', () => {
    // Case AllDay TRUE
    const spySetValue = spyOn(
      component.createTaskForm.controls.dateRange,
      'setValue',
    ).and.callThrough();
    component.selectDetail();
    expect(spySetValue).toHaveBeenCalled();
    // Case AllDay FALSE
    mockDateSelect.allDay = false;
    component.selectDetail();
    expect(spySetValue).toHaveBeenCalledTimes(2);
  });

  it('Validate getAllUsers OK', () => {
    const spyGetAllUsers = spyOn(userService, 'getAllUsers').and.returnValue(
      of(ManageUsersMock.listUsersMock),
    );
    component.getAllUsers();
    expect(component.listUsers).toEqual(ManageUsersMock.listUsersMock);
    expect(spyGetAllUsers).toHaveBeenCalled();
  });

  it('Validate getAllUsers ERROR', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyGetAllUsers = spyOn(userService, 'getAllUsers').and.returnValue(
      throwError(() => new Error('Error')),
    );
    component.getAllUsers();
    expect(spyGetAllUsers).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate getAllTypes OK', () => {
    const spyGetAllTypes = spyOn(taskService, 'getAllTypes').and.returnValue(
      of(CalendarViewerMock.listTypes),
    );
    component.getAllTypes();
    expect(component.listTypes).toEqual(CalendarViewerMock.listTypes);
    expect(spyGetAllTypes).toHaveBeenCalled();
  });

  it('Validate getAllTypes ERROR', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyGetAllTypes = spyOn(taskService, 'getAllTypes').and.returnValue(
      throwError(() => new Error('Error')),
    );
    component.getAllTypes();
    expect(spyGetAllTypes).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate sendNotification OK', () => {
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    const spySendNotification = spyOn(userService, 'sendNotification').and.returnValue(
      of(null),
    );
    component.sendNotification(ManageUsersMock.listUsersMock);
    expect(spySendNotification).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate sendNotification ERROR', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spySendNotification = spyOn(userService, 'sendNotification').and.returnValue(
      throwError(() => new Error('Error')),
    );
    component.sendNotification(ManageUsersMock.listUsersMock);
    expect(spySendNotification).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate createTask OK', () => {
    const spyTaskService = spyOn(taskService, 'createNewTask').and.returnValue(of(null));
    const spySendNotification = spyOn(component, 'sendNotification').and.callThrough();
    const spyToastrService = spyOn(toastrService, 'success').and.callThrough();
    const spyClosEvent = spyOn(component.close, 'emit').and.callThrough();
    component.createTask();
    expect(spySendNotification).toHaveBeenCalled();
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyClosEvent).toHaveBeenCalled();
    expect(spyTaskService).toHaveBeenCalled();
  });

  it('Validate createTask ERROR', () => {
    const spyTaskService = spyOn(taskService, 'createNewTask').and.returnValue(
      throwError(() => new Error('Error')),
    );
    const spyToastrService = spyOn(toastrService, 'error').and.callThrough();
    const spyClosEvent = spyOn(component.close, 'emit').and.callThrough();
    component.createTask();
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyClosEvent).toHaveBeenCalled();
    expect(spyTaskService).toHaveBeenCalled();
  });
});
