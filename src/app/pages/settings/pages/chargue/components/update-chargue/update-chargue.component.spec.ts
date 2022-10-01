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
import { ChargueService } from '../../../../../../services/chargue/chargue.service';
import { ReporteService } from '../../../../../../services/report/report.service';
import { ChargueMock } from '../../chargue.mock.spec';
import { ChargueRouter } from '../../chargue.routing';
import { UpdateChargueComponent } from './update-chargue.component';

fdescribe('UpdateChargueComponent', () => {
  let component: UpdateChargueComponent;
  let fixture: ComponentFixture<UpdateChargueComponent>;
  let chargueService: ChargueService;
  let toastrService: ToastrService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateChargueComponent],
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
    fixture = TestBed.createComponent(UpdateChargueComponent);
    chargueService = TestBed.inject(ChargueService);
    toastrService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    component.inputChargue = ChargueMock.chargue;
    fixture.detectChanges();
  });

  it('UpdateChargueComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateFormUpdateChargue = spyOn(
      component,
      'createFormUpdateChargue',
    ).and.callThrough();
    component.ngOnInit();
    expect(spyCreateFormUpdateChargue).toHaveBeenCalled();
  });

  it('Validate updateChargue OK', () => {
    const spyChargueService = spyOn(chargueService, 'updateChargue').and.returnValue(
      of(null),
    );
    const spyToastrService = spyOn(toastrService, 'success').and.callThrough();
    const spyCloseEvent = spyOn(component.close, 'emit').and.callThrough();
    component.updateChargue();
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyChargueService).toHaveBeenCalled();
    expect(spyCloseEvent).toHaveBeenCalled();
  });

  it('Validate updateChargue ERROR', () => {
    const spyChargueService = spyOn(chargueService, 'updateChargue').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToastrService = spyOn(toastrService, 'error').and.callThrough();
    component.updateChargue();
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyChargueService).toHaveBeenCalled();
  });
});
