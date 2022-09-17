import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { Schedule, UpdateSchedule } from "../../common/interfaces/schedule";
import { ReporteService } from "../../services/report/report.service";
import { ScheduleService } from "../../services/schedule/schedule.service";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.scss"],
})
export class ScheduleComponent implements OnInit {
  @ViewChild("modalNewSchedule", { static: false })
  modalNewSchedule: ModalDirective;
  @ViewChild("modalEditSchedule", { static: false })
  modalEditSchedule: ModalDirective;

  scheduleForm: FormGroup;
  listScheduleOk: boolean = false;
  showModalNewScheduleOk: boolean = false;
  showModalEditScheduleOk: boolean = false;
  listSchedule: Schedule[] = [];
  p = 1;

  selectedSchedule: Schedule;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private reporteService: ReporteService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.scheduleForm = this.fb.group({
      name: new FormControl(""),
    });
    this.getAllSchedule();
  }

  getAllSchedule() {
    this.scheduleService.getAllSchedule().subscribe({
      next: (res) => {
        this.listSchedule = res;
        this.listScheduleOk = true;
      },
      error: (_err) => {
        this.toastrService.error("Sucedio un error al listar los schedules");
      },
    });
  }

  exportPdf() {}

  alertUpdateNotification(schedule: Schedule) {
    Swal.fire({
      title: `${schedule.notificationIsActive ? "Deshabilitar" : "Habilitar"}`,
      text: `${
        schedule.notificationIsActive
          ? "Esta seguro que desea deshabilitar las  notificaciones para"
          : "Esta seguro que desea deshabilitar las notificaciones para"
      } ${schedule.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.updateNotificacion(schedule);
      }
    });
  }

  alertDeleteSchedule(schedule: Schedule) {
    Swal.fire({
      title: "Eliminar Horario",
      text: `Se va eliminar el horario ${schedule.name} , ¿Esta seguro?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.deleteSchedule(schedule.id);
      }
    });
  }

  showModalNewSchedule() {
    this.showModalNewScheduleOk = true;
    this.modalNewSchedule.show();
  }

  showModalEditSchedule(schedule: Schedule) {
    this.showModalEditScheduleOk = true;
    this.selectedSchedule = schedule;
    this.modalEditSchedule.show();
  }

  updateNotificacion(schedule: Schedule) {
    const updateSchedule: UpdateSchedule = schedule;
    updateSchedule.codSchedule = schedule.id;
    updateSchedule.entryHour = schedule.entryHour.slice(0, 5);
    updateSchedule.exitHour = schedule.exitHour.slice(0, 5);
    updateSchedule.notificationIsActive = !schedule.notificationIsActive;
    this.scheduleService.updateSchedule(updateSchedule).subscribe({
      next: (_res) => {
        this.toastrService.success(
          "Se actualizaron las notificaciones para el horario"
        );
        this.getAllSchedule();
      },
      error: (_err) => {
        this.toastrService.error(
          "Sucedio un error al actualizar las notificaciones"
        );
      },
    });
  }

  deleteSchedule(id: number) {
    this.scheduleService.deleteSchedule(id).subscribe({
      next: (_res) => {
        this.toastrService.success("Se elimino exitosamente el horario");
        this.getAllSchedule();
      },
      error: (_err) => {
        this.toastrService.error("Sucedio un error al eliminar el horario");
      },
    });
  }
}
