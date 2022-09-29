import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { ChargueService } from '../../../../services/chargue/chargue.service';
import { ReporteService } from '../../../../services/report/report.service';
import { ChargueComponent } from './chargue.component';
import { ChargueMock } from './chargue.mock.spec';
import { ChargueRouter } from './chargue.routing';

fdescribe('ChargueComponent', () => {
  let component: ChargueComponent;
  let fixture: ComponentFixture<ChargueComponent>;
  let toastrService: ToastrService;
  let chargueService: ChargueService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChargueComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterModule.forChild(ChargueRouter),
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        NgxPaginationModule,
        ModalModule.forRoot(),
      ],
      providers: [
        ToastrService,
        ChargueService,
        ReporteService,
        FormBuilder,
        ReactiveFormsModule,
        { provide: ToastrService, useClass: ToastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargueComponent);
    toastrService = TestBed.inject(ToastrService);
    chargueService = TestBed.inject(ChargueService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ChargueComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCeateFormChargue = spyOn(component, 'createFormChargue').and.callThrough();
    const spyGetAllChargue = spyOn(component, 'getAllChargue').and.callThrough();
    component.ngOnInit();
    expect(spyCeateFormChargue).toHaveBeenCalled();
    expect(spyGetAllChargue).toHaveBeenCalled();
  });

  it('Validate getAllChargue OK', () => {
    const spyGetAllChargue = spyOn(chargueService, 'getAllChargue').and.returnValue(
      of(ChargueMock.listChargue),
    );
    component.getAllChargue();
    expect(spyGetAllChargue).toHaveBeenCalled();
    expect(component.listChargue).toEqual(ChargueMock.listChargue);
    expect(component.listChargueOk).toBeTruthy();
  });

  it('Validate getAllChargue ERROR', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyGetAllChargue = spyOn(chargueService, 'getAllChargue').and.returnValue(
      throwError(() => {
        new Error('');
      }),
    );
    component.getAllChargue();
    expect(spyGetAllChargue).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate showModalCreateChargue', () => {
    const spyShowModal = spyOn(component.modalCreateChargue, 'show').and.callThrough();
    component.showModalCreateChargue();
    expect(component.showModalCreateChargueOk).toBeTruthy();
    expect(spyShowModal).toHaveBeenCalled();
  });

  it('Validate showModalUpdateChargue', () => {
    const spyShowModal = spyOn(component.modalUpdateChargue, 'show').and.callThrough();
    component.showModalUpdateChargue(ChargueMock.listChargue[0]);
    expect(component.selectedChargue).toEqual(ChargueMock.listChargue[0]);
    expect(component.showModalUpdateChargueOk).toBeTruthy();
    expect(spyShowModal).toHaveBeenCalled();
  });

  it('Validate deleteChargue OK', () => {
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    const spyGetAllChargue = spyOn(component, 'getAllChargue').and.callThrough();
    const spyChargueService = spyOn(chargueService, 'deleteChargue').and.returnValue(
      of(null),
    );
    component.deleteChargue(ChargueMock.listChargue[0].id);
    expect(spyToastService).toHaveBeenCalled();
    expect(spyGetAllChargue).toHaveBeenCalled();
    expect(spyChargueService).toHaveBeenCalledWith(ChargueMock.listChargue[0].id);
  });

  it('Validate deleteChargue ERROR', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyGetAllChargue = spyOn(component, 'getAllChargue').and.callThrough();
    const spyChargueService = spyOn(chargueService, 'deleteChargue').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    component.deleteChargue(1);
    expect(spyToastService).toHaveBeenCalled();
    expect(spyGetAllChargue).not.toHaveBeenCalled();
    expect(spyChargueService).toHaveBeenCalled();
  });
});
