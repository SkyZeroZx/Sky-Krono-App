import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FilterLicence } from '../../../../common/pipes/filterLicence.pipe';
import { LicenceService } from '../../../../services/licence/licence.service';
import { LicenceComponent } from './licence.component';
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
});
