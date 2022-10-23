import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ManageUsersComponent } from './manage-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { ManageUsersRouter } from './manage-users.routing';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FilterPipeUser } from '../../../../common/pipes/filter-user.pipe';

@NgModule({
  declarations: [
    ManageUsersComponent,
    CreateUserComponent,
    UpdateUserComponent,
    FilterPipeUser,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgSelectModule,
    SweetAlert2Module.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forChild(ManageUsersRouter),
  ],
  providers: [DatePipe],
})
export class ManageUsersModule {}
