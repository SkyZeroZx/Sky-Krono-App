import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BsDaterangepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { getDatepickerConfig } from '../../../../common/config/Datepicker';
import { FilterLicence } from '../../../../common/pipes/filter-licence.pipe';
import { LicenceService } from '../../../../services/licence/licence.service';
import { LicenceComponent } from './licence.component';
import { LicenceMock } from './licence.mock.spec';
import { LicenceRouter } from './licence.routing';

fdescribe('LicenceComponent', () => {
  let component: LicenceComponent;
  let fixture: ComponentFixture<LicenceComponent>;
  let localeService: BsLocaleService;
  let toastrService: ToastrService;
  let licenceService: LicenceService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LicenceComponent, FilterLicence],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterModule.forChild(LicenceRouter),
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        NgxPaginationModule,
        ModalModule.forRoot(),
      ],
      providers: [
        ToastrService,
        FormBuilder,
        ReactiveFormsModule,
        DatePipe,
        { provide: BsDaterangepickerConfig, useFactory: getDatepickerConfig },
        { provide: ToastrService, useClass: ToastrService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceComponent);
    component = fixture.componentInstance;
    localeService = TestBed.inject(BsLocaleService);
    toastrService = TestBed.inject(ToastrService);
    licenceService = TestBed.inject(LicenceService);

    fixture.detectChanges();
  });

  it('LicenceComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateLicenceForm = spyOn(component, 'createLicenceForm').and.callThrough();
    const spyGetAllLicence = spyOn(component, 'getAllLicence').and.callThrough();
    component.ngOnInit();
    expect(spyGetAllLicence).toHaveBeenCalled();
    expect(spyCreateLicenceForm).toHaveBeenCalled();
  });

  it('Validate getAllLicence OK', () => {
    const spyLicenceService = spyOn(licenceService, 'getAllLicence').and.returnValue(
      of(LicenceMock.listLicenceMock),
    );
    component.getAllLicence();
    expect(spyLicenceService).toHaveBeenCalled();
    expect(component.listLicence).toEqual(LicenceMock.listLicenceMock);
  });

  it('Validate getAllLicence ERROR', () => {
    const spyLicenceService = spyOn(licenceService, 'getAllLicence').and.returnValue(
      throwError(() => new Error('Error')),
    );
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    component.getAllLicence();
    expect(spyLicenceService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate showModalCreateLicence', () => {
    const spyModalCreateLicence = spyOn(
      component.modalCreateLicence,
      'show',
    ).and.callThrough();
    component.showModalCreateLicence();
    expect(component.showModalCreateLicenceOk).toBeTruthy();
    expect(spyModalCreateLicence).toHaveBeenCalled();
  });

  it('Validate showModalUpdateLicence', () => {
    const spyModalUpdateLicence = spyOn(
      component.modalUpdateLicence,
      'show',
    ).and.callThrough();
    component.showModalUpdateLicence(LicenceMock.listLicenceMock[0]);
    expect(component.showModalUpdateLicenceOk).toBeTruthy();
    expect(component.selectedLicence).toEqual(LicenceMock.listLicenceMock[0]);
    expect(spyModalUpdateLicence).toHaveBeenCalled();
  });

  it('Validate deleteLicence OK', () => {
    const spyLicenceService = spyOn(licenceService, 'deleteLicence').and.returnValue(
      of(null),
    );
    const spyGetAllLicence = spyOn(licenceService, 'getAllLicence').and.callThrough();
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    component.deleteLicence(1);
    expect(spyGetAllLicence).toHaveBeenCalled();
    expect(spyLicenceService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate deleteLicence ERROR', () => {
    const spyLicenceService = spyOn(licenceService, 'deleteLicence').and.returnValue(
      throwError(() => new Error('Error')),
    );
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    component.deleteLicence(1);
    expect(spyLicenceService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });
});
