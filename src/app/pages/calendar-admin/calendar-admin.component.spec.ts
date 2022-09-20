import { CalendarOptions, defineFullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CalendarAdminComponent } from './calendar-admin.component';
import { CalendarAdminRouter } from './calendar-admin.routing';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { TaskService } from '../../services/task/task.service';
import { of, throwError } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarViewerMock } from '../calendar-view/calendar-view.mock.spec';
import Swal from 'sweetalert2';
import { defineLocale, esLocale, listLocales } from 'ngx-bootstrap/chronos';

fdescribe('CalendarAdminComponent', () => {
  let component: CalendarAdminComponent;
  let fixture: ComponentFixture<CalendarAdminComponent>;
  let taskService: TaskService;
  let toastrService: ToastrService;
  let bsLocaleService: BsLocaleService;

  beforeAll(() => {
    defineFullCalendarElement();
    defineLocale('es', esLocale);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarAdminComponent, CreateTaskComponent, UpdateTaskComponent],
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
    fixture = TestBed.createComponent(CalendarAdminComponent);
    toastrService = TestBed.inject(ToastrService);
    taskService = TestBed.inject(TaskService);
    bsLocaleService = TestBed.inject(BsLocaleService);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('CalendarAdminComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyGetAllTask = spyOn(component, 'getAllTasks').and.callThrough();
    component.ngOnInit();
    expect(spyGetAllTask).toHaveBeenCalled();
  });

  it('Validate getAllTask OK', () => {
    const spyTaskService = spyOn(taskService, 'getAllTasks').and.returnValue(
      of(CalendarViewerMock.listTaskByUser),
    );
    component.getAllTasks();
    expect(spyTaskService).toHaveBeenCalled();
  });

  it('Validate getAllTask ERROR', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyTaskService = spyOn(taskService, 'getAllTasks').and.returnValue(
      throwError(() => new Error('ERROR')),
    );
    component.getAllTasks();
    expect(spyToastService).toHaveBeenCalled();
    expect(spyTaskService).toHaveBeenCalled();
  });

  it('Validate handleEventClick', fakeAsync(() => {
    const mockEvent: any = {};
    // Case Show Modal Update
    const spyShowModal = spyOn(component.modalUpdateTask, 'show').and.callThrough();
    component.handleEventClick(mockEvent);
    tick(1000);
    fixture.detectChanges();
    expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle().textContent).toEqual('¿Que acción desea realizar?');
    tick(1000);
    fixture.detectChanges();
    Swal.clickConfirm();
    tick(1000);
    fixture.detectChanges();
    expect(component.taskEdit).toEqual(mockEvent);
    expect(component.taskEditOk).toBeTruthy();
    expect(spyShowModal).toHaveBeenCalled();
    flush();
    // Case is Remove Task
    const spyRemoveTask = spyOn(component, 'removeTask').and.callThrough();
    component.handleEventClick(mockEvent);
    tick(1000);
    fixture.detectChanges();
    expect(Swal.isVisible()).toBeTruthy();
    Swal.clickDeny();
    tick(1000);
    fixture.detectChanges();
    expect(Swal.isVisible()).toBeTruthy();
    expect(spyRemoveTask).toHaveBeenCalled();
  }));

  it('Validate eventDraggable OK', () => {
    const spyFormatedTaskChange = spyOn(
      component,
      'formatedTaskChange',
    ).and.callThrough();
    const spyTaskService = spyOn(taskService, 'updateTask').and.returnValue(of(null));
    const spyGetAllTasks = spyOn(taskService, 'getAllTasks').and.callThrough();
    const spyToastrService = spyOn(toastrService, 'success').and.callThrough();
    component.eventDraggable(CalendarViewerMock.eventChangeArg);
    expect(spyFormatedTaskChange).toHaveBeenCalled();
    expect(spyTaskService).toHaveBeenCalled();
    expect(spyGetAllTasks).toHaveBeenCalled();
    expect(spyToastrService).toHaveBeenCalled();
  });

  it('Validate eventDraggable ERROR', () => {
    const spyFormatedTaskChange = spyOn(
      component,
      'formatedTaskChange',
    ).and.callThrough();
    const spyTaskService = spyOn(taskService, 'updateTask').and.returnValue(
      throwError(() => new Error('ERROR')),
    );
    const spyGetAllTasks = spyOn(taskService, 'getAllTasks').and.callThrough();
    const spyToastrService = spyOn(toastrService, 'error').and.callThrough();
    component.eventDraggable(CalendarViewerMock.eventChangeArg);
    expect(spyFormatedTaskChange).toHaveBeenCalled();
    expect(spyTaskService).toHaveBeenCalled();
    expect(spyGetAllTasks).toHaveBeenCalled();
    expect(spyToastrService).toHaveBeenCalled();
  });

  it('Validate removeTask OK', () => {
    const spyTaskService = spyOn(taskService, 'deleteTask').and.returnValue(of(null));
    const spyGetAllTasks = spyOn(taskService, 'getAllTasks').and.callThrough();
    const spyToastrService = spyOn(toastrService, 'success').and.callThrough();
    component.removeTask('1');
    expect(spyTaskService).toHaveBeenCalled();
    expect(spyGetAllTasks).toHaveBeenCalled();
    expect(spyToastrService).toHaveBeenCalled();
  });

  it('Validate removeTask ERROR', () => {
    const spyTaskService = spyOn(taskService, 'deleteTask').and.returnValue(
      throwError(() => new Error('ERROR')),
    );
    const spyToastrService = spyOn(toastrService, 'error').and.callThrough();
    component.removeTask('1');
    expect(spyTaskService).toHaveBeenCalled();
    expect(spyToastrService).toHaveBeenCalled();
  });

  it('Validate handleDateSelect', () => {
    const spyModalShow = spyOn(component.modalCreateTask, 'show').and.callThrough();
    component.handleDateSelect(CalendarViewerMock.eventClickArg);
    expect(spyModalShow).toHaveBeenCalled();
    expect(component.taskCreateOk).toBeTruthy();
    expect(component.dateSelect).toEqual(CalendarViewerMock.eventClickArg);
  });
});
