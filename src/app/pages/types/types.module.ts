import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesComponent } from './types.component';
import { CreateTypesComponent } from './components/create-types/create-types.component';
import { UpdateTypesComponent } from './components/update-types/update-types.component';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { TypesRouter } from './types.routing';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FilterType } from '../../common/pipes/filterType.pipe';
defineLocale('es', esLocale);

@NgModule({
  declarations: [TypesComponent, CreateTypesComponent, UpdateTypesComponent, FilterType],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    RouterModule.forChild(TypesRouter),
  ],
})
export class TypesModule {}
