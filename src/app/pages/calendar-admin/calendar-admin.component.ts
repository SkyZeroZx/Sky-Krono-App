import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { listLocales } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TaskService } from 'src/app/services/task/task.service';
import {
  CalendarOptions,
  DateRange,
  DateSelectArg,
  EventChangeArg,
  EventClickArg,
  EventInput,
  FullCalendarElement,
} from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendar-admin',
  templateUrl: './calendar-admin.component.html',
  styleUrls: ['./calendar-admin.component.scss'],
})
export class CalendarAdminComponent implements OnInit {
  locale = 'es';
  locales = listLocales();
  @ViewChild('modalCreateTask', { static: false })
  readonly modalCreateTask: ModalDirective;
  @ViewChild('modalUpdateTask', { static: false })
  readonly modalUpdateTask: ModalDirective;
  @ViewChild('calendar')
  readonly calendarRef: ElementRef<FullCalendarElement>;
  @ViewChild('swalOptions')
  readonly swalOptions: SwalComponent;
  taskList: EventInput[] = [];
  taskSelected: EventClickArg;
  dateSelect: DateSelectArg;
  taskSelectedOk: boolean = false;
  taskCreateOk: boolean = false;
  constructor(
    private taskService: TaskService,
    private toastrService: ToastrService,
    private localeService: BsLocaleService,
  ) {
    this.localeService.use(this.locale);
  }
  // Create Calendar Options With Admin
  calendarOptions: CalendarOptions = {
    contentHeight: 'auto',
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    longPressDelay: 300,
    unselectAuto: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventChange: this.eventDraggable.bind(this),
    locales: [esLocale],
  };

  ngOnInit(): void {
    this.getAllTasks();
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    this.dateSelect = selectInfo;
    this.taskCreateOk = true;
    this.modalCreateTask.show();
    calendarApi.unselect();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (res) => {
        const calendarApi = this.calendarRef.nativeElement.getApi();
        calendarApi.removeAllEvents();
        calendarApi.addEventSource(res);
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al listar las tareas');
      },
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.taskSelected = clickInfo;
    this.swalOptions.fire();
  }

  showModalUpdateTask() {
    this.taskSelectedOk = true;
    this.modalUpdateTask.show();
  }

  eventDraggable(item: EventChangeArg) {
    this.taskService
      .updateTask(
        this.formatedTaskChange(item.event._def.publicId, item.event._instance.range),
      )
      .subscribe({
        next: (_res) => {
          this.toastrService.success('Tarea actualizada exitosamente');
        },
        error: (_err) => {
          this.toastrService.error('Error al actualizar tarea');
        },
      });
  }

  formatedTaskChange(codTask: string, dateRange: DateRange) {
    return {
      codTask: codTask,
      dateRange: [dateRange.start, dateRange.end],
    };
  }

  removeTask() {
    this.taskService
      .deleteTask(parseInt(this.taskSelected.event?._def?.publicId))
      .subscribe({
        next: (_res) => {
          this.taskSelected.event.remove();
          this.toastrService.success('Tarea eliminada exitosamente');
        },
        error: (_err) => {
          this.toastrService.error('Error al eliminar la tarea');
        },
      });
  }
}
