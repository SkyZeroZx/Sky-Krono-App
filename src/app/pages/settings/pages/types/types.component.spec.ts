import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FilterType } from '../../../../common/pipes/filterType.pipe';
import { TypeService } from '../../../../services/type/type.service';
import { CreateTypesComponent } from './components/create-types/create-types.component';
import { UpdateTypesComponent } from './components/update-types/update-types.component';
import { TypesComponent } from './types.component';
import { TypesRouter } from './types.routing';

fdescribe('TypesComponent', () => {
  let component: TypesComponent;
  let fixture: ComponentFixture<TypesComponent>;
  let typeService: TypeService;
  let toastrService: ToastrService;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TypesComponent,
        CreateTypesComponent,
        UpdateTypesComponent,
        FilterType,
      ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterModule.forChild(TypesRouter),
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        NgxPaginationModule,
        ModalModule.forRoot(),
        SweetAlert2Module.forRoot(),
        TimepickerModule.forRoot(),
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
    fixture = TestBed.createComponent(TypesComponent);
    component = fixture.componentInstance;

    toastrService = TestBed.inject(ToastrService);
    typeService = TestBed.inject(TypeService);

    fixture.detectChanges();
  });

  it('TypesComponent create', () => {
    expect(component).toBeTruthy();
  });
});
