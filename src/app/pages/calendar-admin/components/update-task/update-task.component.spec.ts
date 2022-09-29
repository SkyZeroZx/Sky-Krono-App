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
import { CalendarAdminRouter } from '../../calendar-admin.routing';
import { UserService } from '../../../../services/users/user.service';
import { CalendarViewerMock } from '../../../calendar-view/calendar-view.mock.spec';
import { UpdateTaskComponent } from './update-task.component';
import { ManageUsersMock } from '../../../settings/pages/manage-users/manage-users.mock.spec';

fdescribe('UpdateTaskComponent', () => {
  let component: UpdateTaskComponent;
  let fixture: ComponentFixture<UpdateTaskComponent>;
  let taskService: TaskService;
  let toastrService: ToastrService;
  let bsLocaleService: BsLocaleService;
  let userService: UserService;
  const mockItem = {
    value: {
      id: '123',
    },
  };
  let mockDateSelect: any = {
    allDay: true,
    start: new Date(),
    end: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTaskComponent],
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
    fixture = TestBed.createComponent(UpdateTaskComponent);
    toastrService = TestBed.inject(ToastrService);
    taskService = TestBed.inject(TaskService);
    bsLocaleService = TestBed.inject(BsLocaleService);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    component.taskSelected = mockDateSelect;
    fixture.detectChanges();
  });

  it('CreateTaskComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateFormUpdateTask = spyOn(
      component,
      'createFormUpdateTask',
    ).and.callThrough();
    const spyGetUsersByTask = spyOn(component, 'getUsersByTask').and.callThrough();
    const spyGetAllUsers = spyOn(component, 'getAllUsers').and.callThrough();
    const spyGetAllTypes = spyOn(component, 'getAllTypes').and.callThrough();
    component.ngOnInit();
    expect(spyCreateFormUpdateTask).toHaveBeenCalled();
    expect(spyGetUsersByTask).toHaveBeenCalled();
    expect(spyGetAllUsers).toHaveBeenCalled();
    expect(spyGetAllTypes).toHaveBeenCalled();
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

  it('Validate getUsersByTask OK', () => {
    const spyTaskService = spyOn(taskService, 'getUsersByTask').and.returnValue(
      of(CalendarViewerMock.usersByTask),
    );
    const spyFormSetValue = spyOn(
      component.updateTaskForm.controls.users,
      'setValue',
    ).and.callThrough();
    component.getUsersByTask();
    expect(spyTaskService).toHaveBeenCalled();
    expect(spyFormSetValue).toHaveBeenCalledWith(CalendarViewerMock.usersByTask);
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

  it('Validate removerUserToTask OK', () => {
    const spyFormartDataUserToTask = spyOn(
      component,
      'formatDataUserToTask',
    ).and.callThrough();
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    const spyTaskService = spyOn(taskService, 'deleteUserToTask').and.returnValue(
      of(null),
    );
    component.removeUserToTask(mockItem);
    expect(spyFormartDataUserToTask).toHaveBeenCalled();
    expect(spyTaskService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate removerUserToTask ERROR', () => {
    const spyFormartDataUserToTask = spyOn(
      component,
      'formatDataUserToTask',
    ).and.callThrough();
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyTaskService = spyOn(taskService, 'deleteUserToTask').and.returnValue(
      throwError(() => new Error('ERROR')),
    );
    component.removeUserToTask(mockItem);
    expect(spyFormartDataUserToTask).toHaveBeenCalled();
    expect(spyTaskService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate addUserToTask OK', () => {
    const spyFormartDataUserToTask = spyOn(
      component,
      'formatDataUserToTask',
    ).and.callThrough();
    const spyTaskService = spyOn(taskService, 'addUserToTask').and.returnValue(of(null));
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    component.addUserToTask(mockItem);
    expect(spyFormartDataUserToTask).toHaveBeenCalled();
    expect(spyTaskService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate removerUserToTask ERROR', () => {
    const spyFormartDataUserToTask = spyOn(
      component,
      'formatDataUserToTask',
    ).and.callThrough();
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyTaskService = spyOn(taskService, 'addUserToTask').and.returnValue(
      throwError(() => new Error('ERROR')),
    );
    component.addUserToTask(mockItem);
    expect(spyFormartDataUserToTask).toHaveBeenCalled();
    expect(spyTaskService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate updateTask OK', () => {
    const spyTaskService = spyOn(taskService, 'updateTask').and.returnValue(of(null));
    const spyToastrService = spyOn(toastrService, 'success').and.callThrough();
    const spyClosEvent = spyOn(component.close, 'emit').and.callThrough();
    component.updateTask();
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyClosEvent).toHaveBeenCalled();
    expect(spyTaskService).toHaveBeenCalled();
  });

  it('Validate updateTask ERROR', () => {
    const spyTaskService = spyOn(taskService, 'updateTask').and.returnValue(
      throwError(() => new Error('Error')),
    );
    const spyToastrService = spyOn(toastrService, 'error').and.callThrough();
    const spyClosEvent = spyOn(component.close, 'emit').and.callThrough();
    component.updateTask();
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyClosEvent).toHaveBeenCalled();
    expect(spyTaskService).toHaveBeenCalled();
  });
});
