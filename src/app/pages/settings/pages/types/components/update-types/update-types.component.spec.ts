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
import { of, throwError } from 'rxjs';
import { Type } from '../../../../../../common/interfaces';
import { Util } from '../../../../../../common/utils/util';
import { TypeService } from '../../../../../../services/type/type.service';
import { TypesMock } from '../../types.mock.spec';
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
      declarations: [UpdateTypesComponent],
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
    fixture = TestBed.createComponent(UpdateTypesComponent);
    component = fixture.componentInstance;
    component.inputType = TypesMock.mockinputType;
    toastrService = TestBed.inject(ToastrService);
    typeService = TestBed.inject(TypeService);
    fixture.detectChanges();
  });

  it('TypesComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateUpdateTypeForm = spyOn(
      component,
      'createUpdateTypeForm',
    ).and.callThrough();
    component.ngOnInit();
    expect(spyCreateUpdateTypeForm).toHaveBeenCalled();
  });

  it('Validate isInvalidRangeHour', () => {
    const spyUtilIsInvalidRangeHour = spyOn(Util, 'isInvalidRangeHour').and.callThrough();
    component.isInvalidRangeHour();
    expect(spyUtilIsInvalidRangeHour).toHaveBeenCalled();
  });

  it('Validate updateType OK', () => {
    const spyTypeService = spyOn(typeService, 'updateType').and.returnValue(of(null));
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    const spyCloseEvent = spyOn(component.close, 'emit').and.callThrough();
    const spyUtilFormatDateToHour = spyOn(Util, 'formatDateToHour').and.returnValue(null);
    component.updateType();

    expect(spyTypeService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
    expect(spyCloseEvent).toHaveBeenCalled();
    expect(spyUtilFormatDateToHour).toHaveBeenCalledTimes(2);
  });

  it('Validate updateSchedule ERROR', () => {
    const spyTypeService = spyOn(typeService, 'updateType').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();

    const spyUtilFormatDateToHour = spyOn(Util, 'formatDateToHour').and.returnValue(null);
    component.updateType();

    expect(spyTypeService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
    expect(spyUtilFormatDateToHour).toHaveBeenCalledTimes(2);
  });
});
