import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxContactListModule } from 'ngx-contact-list';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PhonePipe } from '../../../../common/pipes/format-phone.pipe';
import { UserService } from '../../../../services/users/user.service';
import { ContactsMock } from '../../contacts.mock.spec';
import { ContactsRouter } from '../../contacts.routing';
import { ContactDetailComponent } from './contact-detail.component';

fdescribe('ContactDetailComponent', () => {
  let component: ContactDetailComponent;
  let fixture: ComponentFixture<ContactDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactDetailComponent, PhonePipe],
      imports: [
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterModule.forChild(ContactsRouter),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('contact-detail', JSON.stringify(ContactsMock.contactSelected));
    fixture = TestBed.createComponent(ContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ContactDetailComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    component.ngOnInit();
    expect(component.contact).toEqual(ContactsMock.contactSelected);
  });
});
