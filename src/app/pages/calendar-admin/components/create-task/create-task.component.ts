import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateSelectArg } from '@fullcalendar/core';
import { ToastrService } from 'ngx-toastr';
import { Type, User } from '../../../../common/interfaces';
import { TaskService } from '../../../../services/task/task.service';
import { UserService } from '../../../../services/users/user.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  createTaskForm: FormGroup;
  @Output() close = new EventEmitter();
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
      this.createTaskForm.controls.dateRange.setValue([
        this.inputDateSelected.start,
        endDate,
      ]);
    } else {
      let endDate = new Date(this.inputDateSelected.end);
      endDate.setDate(endDate.getDate());
      this.createTaskForm.controls.dateRange.setValue([
        this.inputDateSelected.start,
        endDate,
      ]);
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
      error: (_err) => {
        this.toastrService.error('Error al listar tipos de tarea');
      },
    });
  }

  createFormTask() {
    this.createTaskForm = this.fb.group({
      title: new FormControl('', Validators.compose([Validators.required])),
      codType: new FormControl(null, Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      dateRange: new FormControl(null, Validators.compose([Validators.required])),
      users: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  createTask() {
    this.taskService.createNewTask(this.createTaskForm.value).subscribe({
      next: (_res) => {
        this.toastrService.success('Task registrada exitosamente');
        this.sendNotification(this.createTaskForm.value.users);
        this.close.emit();
      },
      error: (_err) => {
        this.toastrService.error('Error al registrar task');
        this.close.emit();
      },
    });
  }

  sendNotification(users) {
    this.userService.sendNotification(users).subscribe({
      next: (_res) => {
        this.toastrService.success('Notificaciones enviadas exitosamente');
      },
      error: (_err) => {
        this.toastrService.error('Error al enviar notificaciones');
      },
    });
  }
}
