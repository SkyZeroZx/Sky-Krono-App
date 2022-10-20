import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxContactListModule } from 'ngx-contact-list';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { PhonePipe } from '../../common/pipes/format-phone.pipe';
import { UserService } from '../../services/users/user.service';
import { ManageUsersMock } from '../settings/pages/manage-users/manage-users.mock.spec';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactsComponent } from './contacts.component';
import { ContactsMock } from './contacts.mock.spec';
import { ContactsRouter } from './contacts.routing';

fdescribe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;
  let userService: UserService;
  let toastrService: ToastrService;
  let mockRouter = {
    routerState: { root: '' },
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactsComponent, ContactDetailComponent, PhonePipe],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NgxContactListModule,
        SweetAlert2Module.forRoot(),
        RouterModule.forChild(ContactsRouter),
        ToastrModule.forRoot(),
      ],
      providers: [
        ToastrService,
        UserService,
        DatePipe,
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useClass: ToastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    userService = TestBed.inject(UserService);
    toastrService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('ContactsComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngAfterContentInit', () => {
    component.ngAfterContentInit();
    expect(component.height).toBeDefined();
    expect(component.height).toBeGreaterThanOrEqual(0);
  });

  it('Validate ngOnInit', () => {
    const spyGetAllUsers = spyOn(component, 'getAllUsers').and.callThrough();
    component.ngOnInit();
    expect(spyGetAllUsers).toHaveBeenCalled();
  });

  it('Validate getAllUsers OK', () => {
    const spyGetAllUsers = spyOn(userService, 'getAllUsers').and.returnValue(
      of(ManageUsersMock.listUsersMock),
    );
    component.getAllUsers();
    expect(component.listUsers).toEqual(ManageUsersMock.listUsersMock);
    expect(spyGetAllUsers).toHaveBeenCalled();
  });

  it('Validate getAllUsers ERROR', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyGetAllUsers = spyOn(userService, 'getAllUsers').and.returnValue(
      throwError(() => {
        new Error('');
      }),
    );
    component.getAllUsers();
    expect(spyGetAllUsers).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate selected', () => {
    const spyLocalStorage = spyOn(localStorage, 'setItem').and.callThrough();
    const spyRouterNavigate = spyOn(mockRouter, 'navigate').and.callThrough();
    component.selected(ContactsMock.contactSelected);
    expect(spyRouterNavigate).toHaveBeenCalledWith(['/contacts/contact-detail']);
    expect(spyLocalStorage).toHaveBeenCalled();
  });

  it('Validate isImage', () => {
    const user: any = { photo: null };
    expect(component.isImage(user)).toEqual('./assets/img/none.png');
    user.photo = '';
    expect(component.isImage(user)).toEqual('./assets/img/none.png');
    user.photo = 'www.example.com/image/test.jpg';
    expect(component.isImage(user)).toEqual(user.photo);
  });

  it('Validate previewContact', () => {
    const spySwalPreviewContact = spyOn(
      component.swalPreviewContact,
      'fire',
    ).and.callThrough();
    component.previewContact(ContactsMock.mockEvent, ContactsMock.contactSelected);
    expect(spySwalPreviewContact).toHaveBeenCalled();
    expect(component.userPreview).toEqual(ContactsMock.contactSelected);
  });
});
