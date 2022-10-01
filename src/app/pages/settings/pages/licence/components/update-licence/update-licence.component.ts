import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Licence } from '../../../../../../common/interfaces';
import { LicenceService } from '../../../../../../services/licence/licence.service';

@Component({
  selector: 'app-update-licence',
  templateUrl: './update-licence.component.html',
  styleUrls: ['./update-licence.component.scss'],
})
export class UpdateLicenceComponent implements OnInit {
  @Input() inputLicence: Licence;
  @Output() close = new EventEmitter();
  updateLicenceForm: FormGroup;
  minDate: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private licenceService: LicenceService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createFormUpdateLicence();
  }

  createFormUpdateLicence(): void {
    this.updateLicenceForm = this.fb.group({
      id: new FormControl(this.inputLicence.id),
      codUser: new FormControl(
        this.inputLicence.codUser,
        Validators.compose([Validators.required]),
      ),
      fullName: new FormControl(
        { value: this.inputLicence.fullName, disabled: true },
        Validators.compose([Validators.required]),
      ),
      description: new FormControl(
        this.inputLicence.description,
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ),
      dateRange: new FormControl(
        [this.inputLicence.dateInit, this.inputLicence.dateEnd],
        Validators.compose([Validators.required]),
      ),
    });
  }

  updateLicence() {
    this.licenceService.updateLicence(this.updateLicenceForm.value).subscribe({
      next: (_res) => {
        this.toastrService.success('Se actualizo la licencia exitosamente');
        this.close.emit();
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al actualizar la licencia');
      },
    });
  }
}
