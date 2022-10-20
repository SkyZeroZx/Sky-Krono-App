import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Chargue } from '../../../../../../common/interfaces';
import { ChargueService } from '../../../../../../services/chargue/chargue.service';

@Component({
  selector: 'app-update-chargue',
  templateUrl: './update-chargue.component.html',
  styleUrls: ['./update-chargue.component.scss'],
})
export class UpdateChargueComponent implements OnInit {
  @Input() inputChargue: Chargue;
  @Output() close = new EventEmitter();
  updateChargueForm: FormGroup;
  constructor(
    private chargueService: ChargueService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createFormUpdateChargue();
  }

  createFormUpdateChargue(): void {
    this.updateChargueForm = this.fb.group({
      codChargue: new FormControl(this.inputChargue.id),
      name: new FormControl(
        this.inputChargue.name,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ),
      description: new FormControl(
        this.inputChargue.description,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ),
    });
  }

  updateChargue(): void {
    this.chargueService.updateChargue(this.updateChargueForm.value).subscribe({
      next: (_res) => {
        this.toastrService.success('El nuevo cargo se actualizo exitosamente');
        this.updateChargueForm.reset();
        this.close.emit();
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al actualizar el cargo');
      },
    });
  }
}
