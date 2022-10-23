import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Schedule } from '../../../../../../common/interfaces';
import { Util } from '../../../../../../common/utils/util';
import { ScheduleService } from '../../../../../../services/schedule/schedule.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss'],
})
export class CreateScheduleComponent implements OnInit {
  @Output() close = new EventEmitter();
  createScheduleForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createFormSchedule();
  }

  isInvalidRangeHour(): boolean {
    return Util.isInvalidRangeHour(
      this.createScheduleForm.getRawValue().entryHour,
      this.createScheduleForm.getRawValue().exitHour,
    );
  }

  createFormSchedule() {
    this.createScheduleForm = this.fb.group({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150),
        ]),
      ),
      description: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150),
        ]),
      ),
      entryHour: new FormControl('', Validators.compose([Validators.required])),
      exitHour: new FormControl('', Validators.compose([Validators.required])),
      toleranceTime: new FormControl('', Validators.compose([Validators.required])),
      monday: new FormControl(true),
      tuesday: new FormControl(true),
      wednesday: new FormControl(true),
      thursday: new FormControl(true),
      friday: new FormControl(true),
      saturday: new FormControl(false),
      sunday: new FormControl(false),
    });
  }

  createSchedule() {
    const newSchedule: Schedule = this.createScheduleForm.getRawValue();
    newSchedule.entryHour = Util.formatDateToHour(
      this.createScheduleForm.value.entryHour,
    );
    newSchedule.exitHour = Util.formatDateToHour(this.createScheduleForm.value.exitHour);
    this.scheduleService.createSchedule(newSchedule).subscribe({
      next: (_res) => {
        this.toastrService.success('Se registro exitosamente el nuevo horario');
        this.createScheduleForm.reset();
        this.close.emit();
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al registrar el nuevo horario');
      },
    });
  }
}
