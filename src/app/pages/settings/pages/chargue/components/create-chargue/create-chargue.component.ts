import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChargueService } from '../../../../../../services/chargue/chargue.service';

@Component({
  selector: 'app-create-chargue',
  templateUrl: './create-chargue.component.html',
  styleUrls: ['./create-chargue.component.scss'],
})
export class CreateChargueComponent implements OnInit {
  @Output() close = new EventEmitter();
  createChargueForm: FormGroup;

  constructor(
    private chargueService: ChargueService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createFormCreateChargue();
  }

  createFormCreateChargue(): void {
    this.createChargueForm = this.fb.group({
      name: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ),
      description: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ),
    });
  }

  createChargue() {
    this.chargueService.createChargue(this.createChargueForm.value).subscribe({
      next: (_res) => {
        this.toastrService.success('El nuevo cargo se registro exitosamente');
        this.createChargueForm.reset();
        this.close.emit();
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al registrar el cargo');
      },
    });
  }
}
