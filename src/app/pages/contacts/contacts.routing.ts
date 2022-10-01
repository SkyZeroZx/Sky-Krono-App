import { Routes } from '@angular/router';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactsComponent } from './contacts.component';

export const ContactsRouter: Routes = [
  {
    path: '',
    component: ContactsComponent,
    data: { animation: 'contact' },
  },
  {
    path: 'contact-detail',
    component: ContactDetailComponent,
    data: { animation: 'contact-detail' },
  },
];
