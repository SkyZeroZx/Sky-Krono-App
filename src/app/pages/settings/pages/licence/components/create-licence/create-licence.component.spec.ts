import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LicenceService } from '../../../../../../services/licence/licence.service';
import { UserService } from '../../../../../../services/users/user.service';
import { LicenceRouter } from '../../licence.routing';
import { CreateLicenceComponent } from './create-licence.component';

fdescribe('CreateLicenceComponent', () => {
  let component: CreateLicenceComponent;
  let fixture: ComponentFixture<CreateLicenceComponent>;
  let toastrService: ToastrService;
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
        RouterModule.forChild(LicenceRouter),
        ToastrModule.forRoot(),
        NgxPaginationModule,
        ModalModule.forRoot(),
      ],
      providers: [
        ToastrService,
        UserService,
        FormBuilder,
        { provide: ToastrService, useClass: ToastrService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLicenceComponent);
    toastrService = TestBed.inject(ToastrService);
    licenceService = TestBed.inject(LicenceService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('CreateLicenceComponent create', () => {
    expect(component).toBeTruthy();
  });
});
