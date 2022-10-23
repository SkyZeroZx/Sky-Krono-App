import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { RouterModule } from '@angular/router';
import { ContactsRouter } from './contacts.routing';
import { NgxContactListModule } from 'ngx-contact-list';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { PhonePipe } from '../../common/pipes/format-phone.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [ContactsComponent, ContactDetailComponent, PhonePipe],
  imports: [
    CommonModule,
    NgxContactListModule,
    SweetAlert2Module.forRoot(),
    RouterModule.forChild(ContactsRouter),
  ],
  providers: [DatePipe],
})
export class ContactsModule {}
