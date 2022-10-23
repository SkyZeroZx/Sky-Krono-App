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
import { of, throwError } from 'rxjs';
import { FilterType } from '../../../../common/pipes/filter-type.pipe';
import { TypeService } from '../../../../services/type/type.service';
import { CreateTypesComponent } from './components/create-types/create-types.component';
import { UpdateTypesComponent } from './components/update-types/update-types.component';
import { TypesComponent } from './types.component';
import { TypesMock } from './types.mock.spec';
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

  it('Validate ngOnInit', () => {
    const spyGetAllTypes = spyOn(component, 'getAllTypes').and.callThrough();
    component.ngOnInit();
    expect(spyGetAllTypes).toHaveBeenCalled();
  });

  it('Validate getAllTypes OK', () => {
    const spyTypeService = spyOn(typeService, 'getAllTypes').and.returnValue(
      of(TypesMock.listTypesMock),
    );
    component.getAllTypes();
    expect(spyTypeService).toHaveBeenCalled();
    expect(component.listTypes).toEqual(TypesMock.listTypesMock);
    expect(component.listTypesOk).toBeTruthy();
  });

  it('Validate getAllTypes Error', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyTypeService = spyOn(typeService, 'getAllTypes').and.returnValue(
      throwError(() => {
        new Error('Error Service');
      }),
    );
    component.getAllTypes();
    expect(spyTypeService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate showModalCreateType', () => {
    const spyShowModal = spyOn(component.modalCreateType, 'show').and.callThrough();
    component.showModalCreateType();
    expect(component.showModalCreateTypeOk).toBeTruthy();
    expect(spyShowModal).toHaveBeenCalled();
  });

  it('Validate showModalUpdateType', () => {
    const spyShowModal = spyOn(component.modalUpdateType, 'show').and.callThrough();
    component.showModalUpdateSchedule(TypesMock.listTypesMock[0]);
    expect(component.showModalUpdateTypeOk).toBeTruthy();
    expect(component.selectedType).toEqual(TypesMock.listTypesMock[0]);
    expect(spyShowModal).toHaveBeenCalled();
  });

  it('Validate deleteType OK', () => {
    const spyGetAllTypes = spyOn(typeService, 'getAllTypes').and.callThrough();
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    const spyTypeService = spyOn(typeService, 'deleteType').and.returnValue(of(null));
    component.deleteType(TypesMock.listTypesMock[0].codType);
    expect(spyGetAllTypes).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
    expect(spyTypeService).toHaveBeenCalledWith(TypesMock.listTypesMock[0].codType);
  });

  it('Validate deleteType ERROR', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyTypeService = spyOn(typeService, 'deleteType').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    component.deleteType(TypesMock.listTypesMock[0].codType);
    expect(spyToastService).toHaveBeenCalled();
    expect(spyTypeService).toHaveBeenCalledWith(TypesMock.listTypesMock[0].codType);
  });
});
