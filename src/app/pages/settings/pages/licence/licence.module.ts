import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LicenceComponent } from './licence.component';
import { CreateLicenceComponent } from './components/create-licence/create-licence.component';
import { UpdateLicenceComponent } from './components/update-licence/update-licence.component';
import { LicenceRouter } from './licence.routing';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule, BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { getDatepickerConfig } from '../../../../common/config/Datepicker';
import { FilterLicence } from '../../../../common/pipes/filter-licence.pipe';

defineLocale('es', esLocale);
@NgModule({
  declarations: [
    LicenceComponent,
    CreateLicenceComponent,
    UpdateLicenceComponent,
    FilterLicence,
  ],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    SweetAlert2Module.forRoot(),
    RouterModule.forChild(LicenceRouter),
    ModalModule.forRoot(),
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    DatePipe,
    { provide: BsDaterangepickerConfig, useFactory: getDatepickerConfig },
  ],
})
export class LicenceModule {}
