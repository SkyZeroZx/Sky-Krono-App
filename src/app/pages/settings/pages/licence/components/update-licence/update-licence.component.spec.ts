import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule, BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { getDatepickerConfig } from '../../../../../../common/config/Datepicker';
import { LicenceService } from '../../../../../../services/licence/licence.service';
import { UserService } from '../../../../../../services/users/user.service';
import { LicenceMock } from '../../licence.mock.spec';
import { LicenceRouter } from '../../licence.routing';
import { UpdateLicenceComponent } from './update-licence.component';

fdescribe('UpdateLicenceComponent', () => {
  let component: UpdateLicenceComponent;
  let fixture: ComponentFixture<UpdateLicenceComponent>;
  let toastrService: ToastrService;
  let licenceService: LicenceService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateLicenceComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        BsDatepickerModule.forRoot(),
        ReactiveFormsModule,
        NgSelectModule,
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
    fixture = TestBed.createComponent(UpdateLicenceComponent);
    toastrService = TestBed.inject(ToastrService);
    licenceService = TestBed.inject(LicenceService);
    component = fixture.componentInstance;
    component.inputLicence = LicenceMock.mockinputLicence;
    fixture.detectChanges();
  });

  it('CreateLicenceComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateFormUpdateLicence = spyOn(
      component,
      'createFormUpdateLicence',
    ).and.callThrough();
    component.ngOnInit();
    expect(spyCreateFormUpdateLicence).toHaveBeenCalled();
  });

  it('Validate updateLicence OK', () => {
    const spyLincenceService = spyOn(licenceService, 'updateLicence').and.returnValue(
      of(null),
    );
    const spyToastrService = spyOn(toastrService, 'success').and.callThrough();
    const spyCloseEvent = spyOn(component.close, 'emit').and.callThrough();
    component.updateLicence();
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyLincenceService).toHaveBeenCalled();
    expect(spyCloseEvent).toHaveBeenCalled();
  });

  it('Validate updateChargue ERROR', () => {
    const spyLincenceService = spyOn(licenceService, 'updateLicence').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToastrService = spyOn(toastrService, 'error').and.callThrough();
    component.updateLicence();
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyLincenceService).toHaveBeenCalled();
  });
});
