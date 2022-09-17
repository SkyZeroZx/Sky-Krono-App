import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Type } from 'src/app/common/interfaces/type';
import { EventClickArg } from '@fullcalendar/core';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-calendar-view-detail',
  templateUrl: './calendar-view-detail.component.html',
  styleUrls: ['./calendar-view-detail..component.scss'],
})
export class CalendarViewDetailComponent implements OnInit {
  viewForm: FormGroup;
  @Input() taskSelected: EventClickArg;
  listTypes: Type[] = [];
  listUsers: any[] = [];
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private taskService: TaskService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.crearFormViewTask();
    this.getUsersByTask();
    this.getAllTypes();
    this.taskDetails();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.ngOnInit();
  }

  getAllTypes() {
    this.taskService.getAllTypes().subscribe({
      next: (res) => {
        this.listTypes = res;
        this.viewForm.controls.codType.disable();
      },
      error: (_err) => {
        this.toastrService.error('Error al listar types', 'Error');
      },
    });
  }

  getUsersByTask() {
    // Enviamos el id del task
    this.taskService.getUsersByTask(this.taskSelected?.event?._def?.publicId).subscribe({
      next: (res) => {
        this.listUsers = res;
        this.viewForm.controls.users.setValue(res);
        this.viewForm.controls.users.disable();
      },
      error: (_err) => {
        this.toastrService.error('Error al listar usuarios por tarea', 'Error');
      },
    });
  }

  crearFormViewTask() {
    this.viewForm = this.fb.group({
      title: new FormControl(''),
      codType: new FormControl(''),
      description: new FormControl(''),
      dateRange: new FormControl(null),
      users: new FormControl(''),
    });
  }

  taskDetails() {
    this.viewForm.patchValue({
      title: this.taskSelected?.event?._def?.title,
      description: this.taskSelected?.event?._def?.extendedProps?.description,
      codType: this.taskSelected?.event?._def?.extendedProps?.codType,
      dateRange: [
        this.datePipe.transform(this.taskSelected?.event?._instance?.range.start, 'dd/MM/YYYY'),
        this.datePipe.transform(this.taskSelected?.event?._instance?.range.end, 'dd/MM/YYYY'),
      ],
    });
  }
}
