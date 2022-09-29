import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { listLocales } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Licence } from '../../../../common/interfaces';
import { LicenceService } from '../../../../services/licence/licence.service';

@Component({
  selector: 'app-licence',
  templateUrl: './licence.component.html',
  styleUrls: ['./licence.component.scss'],
})
export class LicenceComponent implements OnInit {
  locale = 'es';
  locales = listLocales();
  licenceForm: FormGroup;
  @ViewChild('modalCreateLicence', { static: false })
  modalCreateLicence: ModalDirective;
  @ViewChild('modalUpdateLicence', { static: false })
  modalUpdateLicence: ModalDirective;
  listLicence: Licence[] = [];
  showModalUpdateLicenceOk: boolean = false;
  showModalCreateLicenceOk: boolean = false;
  selectedLicence: Licence;
  p = 1;

  constructor(
    private fb: FormBuilder,
    private licenceService: LicenceService,
    private toastrService: ToastrService,
    private localeService: BsLocaleService,
  ) {
    this.localeService.use(this.locale);
  }

  ngOnInit(): void {
    this.createLicenceForm();
    this.getAllLicence();
  }

  createLicenceForm(): void {
    this.licenceForm = this.fb.group({
      fullName: new FormControl(''),
      dateInit: new FormControl(''),
      dateEnd: new FormControl(''),
    });
  }

  getAllLicence() {
    this.licenceService.getAllLicence().subscribe({
      next: (res) => {
        this.listLicence = res;
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al listar las licencias');
      },
    });
  }

  showModalCreateLicence() {
    this.showModalCreateLicenceOk = true;
    this.modalCreateLicence.show();
  }

  showModalUpdateLicence(licence: Licence) {
    this.selectedLicence = licence;
    this.showModalUpdateLicenceOk = true;
    this.modalUpdateLicence.show();
  }

  deleteLicence(id: number) {
    this.licenceService.deleteLicence(id).subscribe({
      next: (_res) => {
        this.getAllLicence();
        this.toastrService.success('Se elimino exitosamente la licencia');
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al eliminar la licencia');
      },
    });
  }
}
