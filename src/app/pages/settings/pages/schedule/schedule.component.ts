import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Schedule, UpdateSchedule } from '../../../../common/interfaces';
import { ReporteService } from '../../../../services/report/report.service';
import { ScheduleService } from '../../../../services/schedule/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  @ViewChild('modalCreateSchedule')
  modalCreateSchedule: ModalDirective;
  @ViewChild('modalUpdateSchedule')
  modalUpdateSchedule: ModalDirective;
  scheduleForm: FormGroup;
  listScheduleOk: boolean = false;
  showModalCreateScheduleOk: boolean = false;
  showModalUpdateScheduleOk: boolean = false;
  listSchedule: Schedule[] = [];
  p = 1;

  selectedSchedule: Schedule;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private reporteService: ReporteService,
    private scheduleService: ScheduleService,
  ) {}

  ngOnInit(): void {
    this.createScheduleFrom();
    this.getAllSchedule();
  }

  createScheduleFrom(): void {
    this.scheduleForm = this.fb.group({
      filter: new FormControl(''),
    });
  }

  getAllSchedule() {
    this.scheduleService.getAllSchedule().subscribe({
      next: (res) => {
        this.listSchedule = res;
        this.listScheduleOk = true;
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al listar los schedules');
      },
    });
  }

  showModalCreateSchedule() {
    this.showModalCreateScheduleOk = true;
    this.modalCreateSchedule.show();
  }

  showModalUpdateSchedule(schedule: Schedule) {
    this.showModalUpdateScheduleOk = true;
    this.selectedSchedule = schedule;
    this.modalUpdateSchedule.show();
  }

  updateNotification(schedule: Schedule) {
    const updateSchedule: UpdateSchedule = schedule;
    updateSchedule.codSchedule = schedule.id;
    updateSchedule.entryHour = schedule.entryHour.slice(0, 5);
    updateSchedule.exitHour = schedule.exitHour.slice(0, 5);
    updateSchedule.notificationIsActive = !schedule.notificationIsActive;
    this.scheduleService.updateSchedule(updateSchedule).subscribe({
      next: (_res) => {
        this.toastrService.success('Se actualizaron las notificaciones para el horario');
        this.getAllSchedule();
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al actualizar las notificaciones');
      },
    });
  }

  deleteSchedule(id: number) {
    this.scheduleService.deleteSchedule(id).subscribe({
      next: (_res) => {
        this.toastrService.success('Se elimino exitosamente el horario');
        this.getAllSchedule();
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al eliminar el horario');
      },
    });
  }
}
