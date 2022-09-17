import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { listLocales } from 'ngx-bootstrap/chronos';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import esLocale from '@fullcalendar/core/locales/es';
import { TaskService } from 'src/app/services/task/task.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent implements OnInit {
  locale = 'es';
  locales = listLocales();
  // Modal para visualizar el detalle de nuestra tarea
  @ViewChild('modaViewTask', { static: false })
  public modaViewTask: ModalDirective;
  dateSelect: EventClickArg;
  taskViewOk: boolean = false;
  // Configuramos las opciones de calendarOptions segun nuestros requerimientos
  calendarOptions: CalendarOptions = {
    contentHeight: 'auto',
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initialEvents: [],
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    longPressDelay: 300,
    eventClick: this.handleEventClick.bind(this),
    locales: [esLocale],
  };

  constructor(private taskService: TaskService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.listarTaskByUser();
  }

  // Llamamos al servicios que nos lista la tareas por usuario ( segun el usuario logeado)
  listarTaskByUser() {
    this.taskService.getTaskByUser().subscribe({
      next: (res) => {
        // Asigamos la respuesta de los eventos a nuestro calendario
        this.calendarOptions.events = res;
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al listar las tareas');
      },
    });
  }

  // Metodo que escucha los click sobre las tareas en el calendario
  handleEventClick(selectInfo: EventClickArg) {
    const calendarApi = selectInfo.view.calendar;
    this.dateSelect = selectInfo;
    this.taskViewOk = true;
    this.modaViewTask.show();
    calendarApi.unselect();
  }
}
