import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FilterPipeUser } from '../../common/pipes/filterUsers.pipe';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ManageUsersComponent } from './manage-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { ManageUsersRouter } from './manage-users.routing';

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
    ModalModule.forRoot(),
    RouterModule.forChild(ManageUsersRouter),
  ],
  providers: [DatePipe],
})
export class ManageUsersModule {}
