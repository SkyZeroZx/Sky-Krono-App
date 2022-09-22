import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Type } from '../../../../common/interfaces/type';
import { Util } from '../../../../common/utils/util';
import { TypeService } from '../../../../services/type/type.service';

@Component({
  selector: 'app-create-types',
  templateUrl: './create-types.component.html',
  styleUrls: ['./create-types.component.scss'],
})
export class CreateTypesComponent implements OnInit {
  @Output() close = new EventEmitter();
  createTypeForm: FormGroup;
  constructor(
    private typeService: TypeService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.createFormType();
  }

  createFormType() {
    this.createTypeForm = this.fb.group({
      description: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ),
      backgroundColor: new FormControl('', Validators.compose([Validators.required])),
      borderColor: new FormControl('', Validators.compose([Validators.required])),
      start: new FormControl('', Validators.compose([Validators.required])),
      end: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  createType() {
    const createType: Type = this.createTypeForm.getRawValue();
    createType.start = Util.formatDateToHour(this.createTypeForm.value.start);
    createType.end = Util.formatDateToHour(this.createTypeForm.value.end);
    console.log('createType ', createType);
    this.typeService.createType(createType).subscribe({
      next: (_res) => {
        this.toastrService.success('Se registro exitosamente el nuevo tipo');
        this.createTypeForm.reset();
        this.close.emit();
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al registrar el nuevo tipo');
      },
    });
  }
  notClose($event: Event){
    console.log('Not close' , $event);
  }
  eventoTest($event: Event) {
    console.log('Donde hice click?' , $event);
  }

}
