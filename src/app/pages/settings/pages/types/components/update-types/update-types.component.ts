import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Type } from '../../../../../../common/interfaces';
import { Util } from '../../../../../../common/utils/util';
import { TypeService } from '../../../../../../services/type/type.service';

@Component({
  selector: 'app-update-types',
  templateUrl: './update-types.component.html',
  styleUrls: ['./update-types.component.scss'],
})
export class UpdateTypesComponent implements OnInit {
  @Input() inputType: Type;
  @Output() close = new EventEmitter();
  updateTypeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private typeService: TypeService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createUpdateTypeForm();
  }

  isInvalidRangeHour(): boolean {
    return Util.isInvalidRangeHour(
      this.updateTypeForm.getRawValue().start,
      this.updateTypeForm.getRawValue().end,
    );
  }

  createUpdateTypeForm() {
    this.updateTypeForm = this.fb.group({
      codType: new FormControl(this.inputType.codType),
      description: new FormControl(
        this.inputType.description,
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ),
      backgroundColor: new FormControl(
        this.inputType.backgroundColor,
        Validators.compose([Validators.required]),
      ),
      borderColor: new FormControl(
        this.inputType.borderColor,
        Validators.compose([Validators.required]),
      ),
      start: new FormControl(
        Util.formatHourToDate(this.inputType.start),
        Validators.compose([Validators.required]),
      ),
      end: new FormControl(
        Util.formatHourToDate(this.inputType.end),
        Validators.compose([Validators.required]),
      ),
    });
  }

  updateType(): void {
    const updateType: Type = this.updateTypeForm.getRawValue();
    updateType.start = Util.formatDateToHour(this.updateTypeForm.value.start);
    updateType.end = Util.formatDateToHour(this.updateTypeForm.value.end);

    this.typeService.updateType(updateType).subscribe({
      next: (_res) => {
        this.toastrService.success('Se actualizo exitosamente el tipo');
        this.close.emit();
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al actualizar el tipo');
      },
    });
  }
}
