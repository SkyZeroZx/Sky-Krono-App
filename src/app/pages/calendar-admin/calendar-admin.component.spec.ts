import { defineFullCalendarElement, EventClickArg } from '@fullcalendar/web-component';
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
import { CalendarAdminComponent } from './calendar-admin.component';
import { CalendarAdminRouter } from './calendar-admin.routing';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { TaskService } from '../../services/task/task.service';
import { of, throwError } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarViewerMock } from '../calendar-view/calendar-view.mock.spec';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

fdescribe('CalendarAdminComponent', () => {
  let component: CalendarAdminComponent;
  let fixture: ComponentFixture<CalendarAdminComponent>;
  let taskService: TaskService;
  let toastrService: ToastrService;
  let bsLocaleService: BsLocaleService;
  let mockTaskSelected: any = {
    event: {
      remove() {
        return;
      },
    },
  };
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
        SweetAlert2Module.forRoot(),
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

  it('Validate handleEventClick', () => {
    let clickInfoMock: EventClickArg;
    const spySwalOptions = spyOn(component.swalOptions, 'fire').and.callThrough();
    component.handleEventClick(clickInfoMock);
    expect(component.taskSelected).toEqual(clickInfoMock);
    expect(spySwalOptions).toHaveBeenCalled();
  });

  it('Validate showModalUpdateTask', () => {
    const spyShowModalUpdate = spyOn(component.modalUpdateTask, 'show').and.callThrough();
    component.showModalUpdateTask();
    expect(component.taskSelectedOk).toBeTruthy();
    expect(spyShowModalUpdate).toHaveBeenCalled();
  });

  it('Validate eventDraggable OK', () => {
    const spyFormatedTaskChange = spyOn(
      component,
      'formatedTaskChange',
    ).and.callThrough();
    const spyTaskService = spyOn(taskService, 'updateTask').and.returnValue(of(null));
    const spyToastrService = spyOn(toastrService, 'success').and.callThrough();
    component.eventDraggable(CalendarViewerMock.eventChangeArg);
    expect(spyFormatedTaskChange).toHaveBeenCalled();
    expect(spyTaskService).toHaveBeenCalled();
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
    const spyToastrService = spyOn(toastrService, 'error').and.callThrough();
    component.eventDraggable(CalendarViewerMock.eventChangeArg);
    expect(spyFormatedTaskChange).toHaveBeenCalled();
    expect(spyTaskService).toHaveBeenCalled();
    expect(spyToastrService).toHaveBeenCalled();
  });

  it('Validate removeTask OK', () => {
    component.taskSelected = mockTaskSelected;
    const spyTaskService = spyOn(taskService, 'deleteTask').and.returnValue(of(null));
    const spyToastrService = spyOn(toastrService, 'success').and.callThrough();
    component.removeTask();
    expect(spyTaskService).toHaveBeenCalled();
    expect(spyToastrService).toHaveBeenCalled();
  });

  it('Validate removeTask ERROR', () => {
    component.taskSelected = mockTaskSelected;
    const spyTaskService = spyOn(taskService, 'deleteTask').and.returnValue(
      throwError(() => new Error('ERROR')),
    );
    const spyToastrService = spyOn(toastrService, 'error').and.callThrough();
    component.removeTask();
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
