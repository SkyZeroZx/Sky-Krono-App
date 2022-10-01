import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Schedule, UpdateSchedule } from '../../../../../../common/interfaces';
import { Util } from '../../../../../../common/utils/util';
import { ScheduleService } from '../../../../../../services/schedule/schedule.service';

@Component({
  selector: 'app-update-schedule',
  templateUrl: './update-schedule.component.html',
  styleUrls: ['./update-schedule.component.scss'],
})
export class UpdateScheduleComponent implements OnInit {
  @Input() inputSchedule: Schedule;
  @Output() close = new EventEmitter();
  updateScheduleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createEditScheduleForm();
  }

  isInvalidRangeHour(): boolean {
    return Util.isInvalidRangeHour(
      this.updateScheduleForm.getRawValue().entryHour,
      this.updateScheduleForm.getRawValue().exitHour,
    );
  }

  createEditScheduleForm(): void {
    this.updateScheduleForm = this.fb.group({
      codSchedule: new FormControl(this.inputSchedule.id),
      name: new FormControl(
        this.inputSchedule.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150),
        ]),
      ),
      description: new FormControl(
        this.inputSchedule.description,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150),
        ]),
      ),
      entryHour: new FormControl(
        Util.formatHourToDate(this.inputSchedule.entryHour),
        Validators.compose([Validators.required]),
      ),
      exitHour: new FormControl(
        Util.formatHourToDate(this.inputSchedule.exitHour),
        Validators.compose([Validators.required]),
      ),
      toleranceTime: new FormControl(
        this.inputSchedule.toleranceTime,
        Validators.compose([Validators.required]),
      ),
      monday: new FormControl(this.inputSchedule.monday),
      tuesday: new FormControl(this.inputSchedule.tuesday),
      wednesday: new FormControl(this.inputSchedule.wednesday),
      thursday: new FormControl(this.inputSchedule.thursday),
      friday: new FormControl(this.inputSchedule.friday),
      saturday: new FormControl(this.inputSchedule.saturday),
      sunday: new FormControl(this.inputSchedule.sunday),
      notificationIsActive: new FormControl(this.inputSchedule.notificationIsActive),
    });
  }

  updateSchedule() {
    const updateSchedule: UpdateSchedule = this.updateScheduleForm.getRawValue();
    updateSchedule.entryHour = Util.formatDateToHour(
      this.updateScheduleForm.value.entryHour,
    );
    updateSchedule.exitHour = Util.formatDateToHour(
      this.updateScheduleForm.value.exitHour,
    );
    this.scheduleService.updateSchedule(updateSchedule).subscribe({
      next: (_res) => {
        this.close.emit();
        this.toastrService.success('Se actualizo exitosamente el horario');
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al editar el horario');
      },
    });
  }
}
