import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesComponent } from './types.component';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { TypesRouter } from './types.routing';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FilterType } from '../../../../common/pipes/filter-type.pipe';
import { CreateTypesComponent } from './components/create-types/create-types.component';
import { UpdateTypesComponent } from './components/update-types/update-types.component';

defineLocale('es', esLocale);
@NgModule({
  declarations: [TypesComponent, CreateTypesComponent, UpdateTypesComponent, FilterType],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    SweetAlert2Module.forRoot(),
    TimepickerModule.forRoot(),
    RouterModule.forChild(TypesRouter),
  ],
})
export class TypesModule {}
