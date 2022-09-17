import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateSelectArg } from '@fullcalendar/core';
import { ToastrService } from 'ngx-toastr';
import { Type } from 'src/app/common/interfaces/type';
import { User } from 'src/app/common/interfaces/user';
import { TaskService } from 'src/app/services/task/task.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  createTaskForm: FormGroup;
  @Output() close = new EventEmitter<any>();
  @Input() inputDateSelected: DateSelectArg;
  listUsers: User[] = [];
  listTypes: Type[] = [];
  today: Date;
  maxDate: Date;
  minDate: Date;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.createFormTask();
    this.getAllUsers();
    this.getAllTypes();
    this.selectDetail();
  }

  selectDetail() {
    if (this.inputDateSelected.allDay) {
      let endDate = new Date(this.inputDateSelected.end);
      endDate.setDate(endDate.getDate() - 1);
      this.createTaskForm.controls.dateRange.setValue([this.inputDateSelected.start, endDate]);
    } else {
      let endDate = new Date(this.inputDateSelected.end);
      endDate.setDate(endDate.getDate());
      this.createTaskForm.controls.dateRange.setValue([this.inputDateSelected.start, endDate]);
    }
  }

  // Metodo que valida el type seleccionado en caso de ser nocturno
  validateTypeDate() {
    // Nocturno es type 3
    if (this.createTaskForm.value.codType == 3) {
      let endDate = new Date(this.inputDateSelected.end);
      endDate.setDate(endDate.getDate());
      this.createTaskForm.controls.dateRange.setValue([this.inputDateSelected.start, endDate]);
    } else {
      // Para el caso contrario que seria 1 o 2 u otro dejar fechas originales
      this.selectDetail();
    }
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.listUsers = res;
      },
      error: (_err) => {
        this.toastrService.error('Error al listar usuarios');
      },
    });
  }

  getAllTypes() {
    this.taskService.getAllTypes().subscribe({
      next: (res) => {
        this.listTypes = res;
      },
      error: (err) => {
        this.toastrService.error('Error al listar tipos de tarea');
      },
    });
  }

  createFormTask() {
    this.createTaskForm = this.fb.group({
      title: new FormControl('', Validators.compose([Validators.required])),
      codType: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      dateRange: new FormControl(null, Validators.compose([Validators.required])),
      users: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  sendNotification(data) {
    this.userService.sendNotification(data).subscribe({
      next: (_res) => {
        this.toastrService.success('Notificaciones enviadas exitosamente');
      },
      error(_err) {
        this.toastrService.error('Error al enviar notificacion task');
      },
    });
  }

  formatDataNotification(users) {
    return { users: users };
  }

  createTask() {
    this.taskService.createNewTask(this.createTaskForm.value).subscribe({
      next: (_res) => {
        this.toastrService.success('Task registrada exitosamente');
        this.sendNotification(this.formatDataNotification(this.createTaskForm.value.users));
        this.close.emit();
      },
      error: (_err) => {
        this.toastrService.error('Error al registrar task');
        this.close.emit();
      },
    });
  }
}
