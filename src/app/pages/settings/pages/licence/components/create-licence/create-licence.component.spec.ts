import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  BsDatepickerModule,
  BsDaterangepickerConfig,
  BsLocaleService,
} from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { getDatepickerConfig } from '../../../../../../common/config/Datepicker';
import { LicenceService } from '../../../../../../services/licence/licence.service';
import { UserService } from '../../../../../../services/users/user.service';
import { ManageUsersMock } from '../../../manage-users/manage-users.mock.spec';
import { LicenceRouter } from '../../licence.routing';
import { CreateLicenceComponent } from './create-licence.component';

fdescribe('CreateLicenceComponent', () => {
  let component: CreateLicenceComponent;
  let fixture: ComponentFixture<CreateLicenceComponent>;
  let toastrService: ToastrService;
  let userService: UserService;
  let licenceService: LicenceService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLicenceComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        BsDatepickerModule.forRoot(),
        RouterModule.forChild(LicenceRouter),
        ToastrModule.forRoot(),
        NgxPaginationModule,
        ModalModule.forRoot(),
      ],
      providers: [
        ToastrService,
        UserService,
        FormBuilder,
        DatePipe,
        { provide: BsDaterangepickerConfig, useFactory: getDatepickerConfig },
        { provide: ToastrService, useClass: ToastrService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLicenceComponent);
    toastrService = TestBed.inject(ToastrService);
    licenceService = TestBed.inject(LicenceService);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('CreateLicenceComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateFormCreateLicence = spyOn(
      component,
      'createFormCreateLicence',
    ).and.callThrough();
    const spyGetAllUsers = spyOn(component, 'getAllUsers').and.callThrough();
    component.ngOnInit();
    expect(spyCreateFormCreateLicence).toHaveBeenCalled();
    expect(spyGetAllUsers).toHaveBeenCalled();
  });

  it('Validate createLicence OK', () => {
    const spyLicenceService = spyOn(licenceService, 'createLicence').and.returnValue(
      of(null),
    );
    const spyToastrService = spyOn(toastrService, 'success').and.callThrough();
    const spyFormReset = spyOn(component.createLicenceForm, 'reset').and.callThrough();
    const spyCloseEvent = spyOn(component.close, 'emit').and.callThrough();
    component.createLicence();
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyLicenceService).toHaveBeenCalled();
    expect(spyCloseEvent).toHaveBeenCalled();
    expect(spyFormReset).toHaveBeenCalled();
  });

  it('Validate createLicence ERROR', () => {
    const spyLicenceService = spyOn(licenceService, 'createLicence').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToastrService = spyOn(toastrService, 'error').and.callThrough();
    component.createLicence();
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyLicenceService).toHaveBeenCalled();
  });

  it('Validate getAllUsers OK', () => {
    const spyUserService = spyOn(userService, 'getAllUsers').and.returnValue(
      of(ManageUsersMock.listUsersMock),
    );
    component.getAllUsers();
    expect(component.listUsers).toEqual(ManageUsersMock.listUsersMock);
    expect(spyUserService).toHaveBeenCalled();
  });

  it('Validate getAllUsers ERROR', () => {
    const spyUserService = spyOn(userService, 'getAllUsers').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    component.getAllUsers();
    expect(spyUserService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });
});
