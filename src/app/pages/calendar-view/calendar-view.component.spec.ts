import { CalendarOptions, defineFullCalendarElement } from '@fullcalendar/web-component';
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
import { TaskService } from '../../services/task/task.service';
import { CalendarViewComponent } from './calendar-view.component';
import { CalendarViewRouter } from './calendar-view.routing';
import { CalendarViewDetailComponent } from './components/detail/calendar-view-detail..component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { of, throwError } from 'rxjs';
import { CalendarViewerMock } from './calendar-view.mock.spec';

fdescribe('CalendarViewComponent', () => {
  let component: CalendarViewComponent;
  let fixture: ComponentFixture<CalendarViewComponent>;
  let taskService: TaskService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarViewComponent, CalendarViewDetailComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterModule.forChild(CalendarViewRouter),
        FormsModule,
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

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarViewComponent);
    toastrService = TestBed.inject(ToastrService);
    taskService = TestBed.inject(TaskService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('CalendarViewComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyListTaskByUser = spyOn(component, 'listTaskByUser').and.callThrough();
    component.ngOnInit();
    expect(spyListTaskByUser).toHaveBeenCalled();
  });

  it('Validate listTaskByUser OK', () => {
    const spyGetTaskByUser = spyOn(taskService, 'getTaskByUser').and.returnValue(
      of(CalendarViewerMock.listTaskByUser),
    );
    component.listTaskByUser();
    expect(spyGetTaskByUser).toHaveBeenCalled();
  });

  it('Validate listTaskByUser Error', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyGetTaskByUser = spyOn(taskService, 'getTaskByUser').and.returnValue(
      throwError(() => new Error('Error')),
    );
    component.listTaskByUser();
    expect(spyGetTaskByUser).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate handleEventClick', () => {
    const spyModal = spyOn(component.modaViewTask, 'show').and.callThrough();
    component.handleEventClick(CalendarViewerMock.eventClickArg);
    expect(spyModal).toHaveBeenCalled();
    expect(component.taskViewOk).toBeTruthy();
    expect(component.dateSelect).toEqual(CalendarViewerMock.eventClickArg);
  });
});
