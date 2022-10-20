import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Type } from '../../../../common/interfaces';
import { TypeService } from '../../../../services/type/type.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
})
export class TypesComponent implements OnInit {
  @ViewChild('modalCreateType', { static: false })
  modalCreateType: ModalDirective;
  @ViewChild('modalUpdateType', { static: false })
  modalUpdateType: ModalDirective;
  listTypesOk: boolean = false;
  showModalCreateTypeOk: boolean = false;
  showModalUpdateTypeOk: boolean = false;
  typeForm: FormGroup;
  selectedType: Type;
  listTypes: Type[] = [];
  p = 1;

  constructor(
    private typeService: TypeService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.createFormTypes();
    this.getAllTypes();
  }

  getAllTypes(): void {
    this.typeService.getAllTypes().subscribe({
      next: (res) => {
        this.listTypesOk = true;
        this.listTypes = res;
      },
      error: (_err) => {
        this.toastrService.error('Error al listar tipos');
      },
    });
  }

  createFormTypes(): void {
    this.typeForm = this.fb.group({
      filter: new FormControl(''),
    });
  }

  showModalCreateType() {
    this.showModalCreateTypeOk = true;
    this.modalCreateType.show();
  }

  showModalUpdateSchedule(type: Type) {
    this.selectedType = type;
    this.showModalUpdateTypeOk = true;
    this.modalUpdateType.show();
  }

  deleteType(codType: number) {
    this.typeService.deleteType(codType).subscribe({
      next: (_res) => {
        this.getAllTypes();
        this.toastrService.success('Se elimino exitosamente el tipo');
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al eliminar el tipo');
      },
    });
  }
}
