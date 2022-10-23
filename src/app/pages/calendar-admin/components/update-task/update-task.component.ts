import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventClickArg } from '@fullcalendar/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/users/user.service';
import { Type, User } from '../../../../common/interfaces';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
})
export class UpdateTaskComponent implements OnInit {
  updateTaskForm: FormGroup;
  @Output() close = new EventEmitter<any>();
  @Input() taskSelected: EventClickArg;
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
    this.createFormUpdateTask();
    this.getUsersByTask();
    this.getAllUsers();
    this.getAllTypes();
  }

  updateTask() {
    this.taskService.updateTask(this.updateTaskForm.value).subscribe({
      next: (_res) => {
        this.close.emit();
        this.toastrService.success('Se actualizo exitosamente la tarea');
      },
      error: (_err) => {
        this.close.emit();
        this.toastrService.error('Error al actualizar la tarea');
      },
    });
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
        this.toastrService.error('Error al listar tipos');
      },
    });
  }

  getUsersByTask() {
    this.taskService.getUsersByTask(this.taskSelected?.event?._def?.publicId).subscribe({
      next: (res) => {
        this.updateTaskForm.controls.users.setValue(res);
      },
      error: (_err) => {
        this.toastrService.error('Error al listar usuarios por tarea');
      },
    });
  }

  removeUserToTask(item: any) {
    this.taskService
      .deleteUserToTask(this.formatDataUserToTask(item.value.id))
      .subscribe({
        next: (_res) => {
          this.toastrService.success('Se removio exitosamente al usuario');
        },
        error: (_err) => {
          this.toastrService.error('Error al remover usuario');
        },
      });
  }

  formatDataUserToTask(id: any) {
    return { codTask: this.updateTaskForm.value.codTask, codUser: id };
  }

  addUserToTask(item: any) {
    this.taskService.addUserToTask(this.formatDataUserToTask(item.id)).subscribe({
      next: (_res) => {
        this.toastrService.success('Se agrego exitosamente al usuario');
      },
      error: (_err) => {
        this.toastrService.error('Error al agregar usuario');
      },
    });
  }

  createFormUpdateTask() {
    this.updateTaskForm = this.fb.group({
      codTask: new FormControl(
        this.taskSelected?.event?._def?.publicId,
        Validators.compose([Validators.required]),
      ),
      title: new FormControl(
        this.taskSelected?.event?._def?.title,
        Validators.compose([Validators.required]),
      ),
      codType: new FormControl(
        this.taskSelected?.event?._def?.extendedProps?.codType,
        Validators.compose([Validators.required]),
      ),
      description: new FormControl(
        this.taskSelected?.event?._def?.extendedProps?.description,
        Validators.compose([Validators.required]),
      ),
      dateRange: new FormControl(
        [
          this.taskSelected?.event?._instance?.range.start,
          this.taskSelected?.event?._instance?.range.end,
        ],
        Validators.compose([Validators.required]),
      ),
      users: new FormControl('', Validators.compose([Validators.required])),
    });
  }
}
