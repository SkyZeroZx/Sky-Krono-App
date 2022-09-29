import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { Licence } from '../../../../../../common/interfaces';
import { LicenceService } from '../../../../../../services/licence/licence.service';
import { UserService } from '../../../../../../services/users/user.service';
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

  let mockinputLicence: Licence = {
    id: 0,
    codUser: 0,
    description: 'Testing',
    dateInit: '2022-09-29',
    dateEnd: '2022-09-29',
  };
  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLicenceComponent);
    toastrService = TestBed.inject(ToastrService);
    licenceService = TestBed.inject(LicenceService);
    component = fixture.componentInstance;
    component.inputLicence = mockinputLicence;
    fixture.detectChanges();
  });

  it('CreateLicenceComponent create', () => {
    expect(component).toBeTruthy();
  });
});
