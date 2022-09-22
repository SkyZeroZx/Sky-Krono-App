import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import esLocale from '@fullcalendar/core/locales/es';
import { listLocales } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TaskService } from 'src/app/services/task/task.service';
import {
  CalendarOptions,
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
@Component({
  selector: 'app-calendar-admin',
  templateUrl: './calendar-admin.component.html',
  styleUrls: ['./calendar-admin.component.scss'],
})
export class CalendarAdminComponent implements OnInit {
  locale = 'es';
  locales = listLocales();

  @ViewChild('modalCreateTask', { static: false })
  modalCreateTask: ModalDirective;
  @ViewChild('modalUpdateTask', { static: false })
  modalUpdateTask: ModalDirective;
  // references the #calendar in the template
  @ViewChild('calendar') calendarRef: ElementRef<FullCalendarElement>;
  taskList: EventInput[] = [];
  taskEdit: any;
  dateSelect: any;
  taskEditOk: boolean = false;
  taskCreateOk: boolean = false;

  constructor(
    private taskService: TaskService,
    private toastrService: ToastrService,
    private localeService: BsLocaleService,
  ) {
    this.localeService.use(this.locale);
  }

  // Creamos nuestro calendario con las configuraciones respectivas para el administrador
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
    console.log('selectInfo ', selectInfo);
    this.taskCreateOk = true;
    this.modalCreateTask.show();
    calendarApi.unselect();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (res) => {
        let calendarApi = this.calendarRef.nativeElement.getApi();

        calendarApi.removeAllEvents();

        calendarApi.addEventSource(res);
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al listar las tareas');
      },
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    Swal.fire({
      title: '¿Que acción desea realizar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Editar',
      denyButtonText: `Eliminar`,
      cancelButtonText: 'Cancelar',
    }).then(({ isConfirmed, isDenied }) => {
      if (isConfirmed) {
        this.taskEdit = clickInfo;
        this.taskEditOk = true;
        this.modalUpdateTask.show();
      }
      if (isDenied) {
        clickInfo.event.remove();
        this.removeTask(clickInfo.event?._def?.publicId);
      }
    });
  }

  eventDraggable(item: EventChangeArg) {
    // item.event.remove();
    this.taskService
      .updateTask(
        this.formatedTaskChange(item.event._def.publicId, item.event._instance.range),
      )
      .subscribe({
        next: (_res) => {
          this.toastrService.success('Tarea actualizada exitosamente');
          //   this.getAllTasks();
        },
        error: (_err) => {
          this.toastrService.error('Error al actualizar tarea');
          //       this.getAllTasks();
        },
      });
  }

  formatedTaskChange(codTask, dateRange) {
    return {
      codTask: codTask,
      dateRange: [dateRange.start, dateRange.end],
    };
  }

  removeTask(id: string) {
    this.taskService.deleteTask(parseInt(id)).subscribe({
      next: (_res) => {
        // this.getAllTasks();
        this.toastrService.success('Tarea eliminada exitosamente');
      },
      error: (_err) => {
        this.toastrService.error('Error al eliminar la tarea');
      },
    });
  }
}
