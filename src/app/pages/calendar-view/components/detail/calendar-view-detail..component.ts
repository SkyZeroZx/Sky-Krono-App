import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Type, UserByTask } from '../../../../common/interfaces';
import { EventClickArg } from '@fullcalendar/core';
import { TaskService } from '../../../../services/task/task.service';

@Component({
  selector: 'app-calendar-view-detail',
  templateUrl: './calendar-view-detail.component.html',
  styleUrls: ['./calendar-view-detail..component.scss'],
})
export class CalendarViewDetailComponent implements OnInit {
  viewForm: FormGroup;
  @Input() taskSelected: EventClickArg;
  listTypes: Type[] = [];
  listUsers: UserByTask[] = [];
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private taskService: TaskService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.createFormViewTask();
    this.getUsersByTask();
    this.getAllTypes();
  }

  getAllTypes() {
    this.taskService.getAllTypes().subscribe({
      next: (res) => {
        this.listTypes = res;
        this.viewForm.controls.codType.disable();
      },
      error: (_err) => {
        this.toastrService.error('Error al listar tipos');
      },
    });
  }

  getUsersByTask() {
    this.taskService.getUsersByTask(this.taskSelected?.event?._def?.publicId).subscribe({
      next: (res) => {
        this.listUsers = res;
        this.viewForm.controls.users.setValue(res);
        this.viewForm.controls.users.disable();
      },
      error: (_err) => {
        this.toastrService.error('Error al listar usuarios por tarea');
      },
    });
  }

  createFormViewTask() {
    this.viewForm = this.fb.group({
      title: new FormControl(this.taskSelected?.event?._def?.title),
      codType: new FormControl(this.taskSelected?.event?._def?.extendedProps?.codType),
      description: new FormControl(
        this.taskSelected?.event?._def?.extendedProps?.description,
      ),
      dateRange: new FormControl([
        this.datePipe.transform(
          this.taskSelected?.event?._instance?.range.start,
          'dd/MM/YYYY',
        ),
        this.datePipe.transform(
          this.taskSelected?.event?._instance?.range.end,
          'dd/MM/YYYY',
        ),
      ]),
      users: new FormControl(''),
    });
  }
}
