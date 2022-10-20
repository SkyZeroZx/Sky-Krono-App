import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Chargue } from '../../../../common/interfaces';
import { ChargueService } from '../../../../services/chargue/chargue.service';

@Component({
  selector: 'app-chargue',
  templateUrl: './chargue.component.html',
  styleUrls: ['./chargue.component.scss'],
})
export class ChargueComponent implements OnInit {
  chargueForm: FormGroup;
  listChargueOk: boolean = false;
  showModalCreateChargueOk: boolean = false;
  showModalUpdateChargueOk: boolean = false;
  p = 1;
  listChargue: Chargue[] = [];
  selectedChargue: Chargue;
  @ViewChild('modalCreateChargue', { static: false })
  modalCreateChargue: ModalDirective;
  @ViewChild('modalUpdateChargue', { static: false })
  modalUpdateChargue: ModalDirective;

  constructor(
    private fb: FormBuilder,
    private chargueService: ChargueService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createFormChargue();
    this.getAllChargue();
  }

  createFormChargue(): void {
    this.chargueForm = this.fb.group({
      filter: new FormControl(''),
    });
  }

  getAllChargue() {
    this.chargueService.getAllChargue().subscribe({
      next: (res) => {
        this.listChargue = res;
        this.listChargueOk = true;
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al listar los cargos');
      },
    });
  }

  showModalCreateChargue() {
    this.showModalCreateChargueOk = true;
    this.modalCreateChargue.show();
  }

  showModalUpdateChargue(chargue: Chargue) {
    this.selectedChargue = chargue;
    this.showModalUpdateChargueOk = true;
    this.modalUpdateChargue.show();
  }

  deleteChargue(id: number) {
    this.chargueService.deleteChargue(id).subscribe({
      next: (_res) => {
        this.toastrService.success('Se elimino exitosamente el cargo');
        this.getAllChargue();
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al eliminar el cargo');
      },
    });
  }
}
