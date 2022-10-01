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
import { ChargueRouter } from '../../chargue.routing';
import { CreateChargueComponent } from './create-chargue.component';

fdescribe('CreateChargueComponent', () => {
  let component: CreateChargueComponent;
  let fixture: ComponentFixture<CreateChargueComponent>;
  let chargueService: ChargueService;
  let toastrService: ToastrService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateChargueComponent],
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
    fixture = TestBed.createComponent(CreateChargueComponent);
    chargueService = TestBed.inject(ChargueService);
    toastrService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('CreateChargueComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateFormCreateChargue = spyOn(
      component,
      'createFormCreateChargue',
    ).and.callThrough();
    component.ngOnInit();
    expect(spyCreateFormCreateChargue).toHaveBeenCalled();
  });

  it('Validate createChargue OK', () => {
    const spyChargueService = spyOn(chargueService, 'createChargue').and.returnValue(
      of(null),
    );
    const spyToastrService = spyOn(toastrService, 'success').and.callThrough();
    const spyFormReset = spyOn(component.createChargueForm, 'reset').and.callThrough();
    const spyCloseEvent = spyOn(component.close, 'emit').and.callThrough();
    component.createChargue();
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyChargueService).toHaveBeenCalled();
    expect(spyCloseEvent).toHaveBeenCalled();
    expect(spyFormReset).toHaveBeenCalled();
  });

  it('Validate createChargue ERROR', () => {
    const spyChargueService = spyOn(chargueService, 'createChargue').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToastrService = spyOn(toastrService, 'error').and.callThrough();
    component.createChargue();
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyChargueService).toHaveBeenCalled();
  });
});
