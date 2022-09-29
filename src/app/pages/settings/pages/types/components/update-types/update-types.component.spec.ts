import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { Type } from '../../../../../../common/interfaces';
import { TypeService } from '../../../../../../services/type/type.service';
import { TypesRouter } from '../../types.routing';
import { CreateTypesComponent } from '../create-types/create-types.component';
import { UpdateTypesComponent } from './update-types.component';

fdescribe('UpdateTypesComponent', () => {
  let component: UpdateTypesComponent;
  let fixture: ComponentFixture<UpdateTypesComponent>;
  let typeService: TypeService;
  let toastrService: ToastrService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTypesComponent],
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

  let mockinputType: Type = {
    codType: 0,
    description: '',
    backgroundColor: '',
    borderColor: '',
    start: '',
    end: '',
    display: '',
  };
  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTypesComponent);
    component = fixture.componentInstance;
    component.inputType = mockinputType;
    toastrService = TestBed.inject(ToastrService);
    typeService = TestBed.inject(TypeService);
    fixture.detectChanges();
  });

  it('TypesComponent create', () => {
    expect(component).toBeTruthy();
  });
});
