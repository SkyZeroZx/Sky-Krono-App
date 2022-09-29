import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { ChargueService } from '../../../../../../services/chargue/chargue.service';
import { ScheduleService } from '../../../../../../services/schedule/schedule.service';
import { UserService } from '../../../../../../services/users/user.service';
import { ManageUsersMock } from '../../manage-users.mock.spec';
import { ManageUsersRouter } from '../../manage-users.routing';
import { UpdateUserComponent } from './update-user.component';

fdescribe('UpdateUserComponent', () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;
  let toastrService: ToastrService;
  let chargueService: ChargueService;
  let scheduleService: ScheduleService;
  let userService: UserService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        CommonModule,
        RouterModule.forChild(ManageUsersRouter),
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
      ],
      providers: [
        ToastrService,
        ChargueService,
        ScheduleService,
        UserService,
        FormBuilder,
        ReactiveFormsModule,
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
    component.inputUser = ManageUsersMock.userMock;
    toastrService = TestBed.inject(ToastrService);
    userService = TestBed.inject(UserService);
    chargueService = TestBed.inject(ChargueService);
    scheduleService = TestBed.inject(ScheduleService);
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('UpdateUserComponent Create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateFormUpdateUser = spyOn(
      component,
      'createFormUpdateUser',
    ).and.callThrough();
    const spyGetAllSchedule = spyOn(component, 'getAllSchedule').and.callThrough();
    const spyGetAllCargues = spyOn(component, 'getAllCargues').and.callThrough();
    component.ngOnInit();
    expect(spyCreateFormUpdateUser).toHaveBeenCalled();
    expect(spyGetAllSchedule).toHaveBeenCalled();
    expect(spyGetAllCargues).toHaveBeenCalled();
  });

  it('Validate updateUser OK', () => {
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    const spyCloseEvent = spyOn(component.close, 'emit').and.callThrough();
    const spyUpdateUser = spyOn(userService, 'updateUser').and.returnValue(of(null));
    component.updateUser();
    expect(spyToastService).toHaveBeenCalled();
    expect(spyCloseEvent).toHaveBeenCalled();
    expect(spyUpdateUser).toHaveBeenCalled();
  });

  it('Validate updateUser ERROR', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyUpdateUser = spyOn(userService, 'updateUser').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    component.updateUser();
    expect(spyToastService).toHaveBeenCalled();
    expect(spyUpdateUser).toHaveBeenCalled();
  });

  it('Validate getAllCargues OK', () => {
    const spyChargueService = spyOn(chargueService, 'getAllChargue').and.returnValue(
      of(ManageUsersMock.listChargues),
    );
    component.getAllCargues();
    expect(spyChargueService).toHaveBeenCalled();
    expect(component.listChargue).toEqual(ManageUsersMock.listChargues);
  });

  it('Validate getAllCargues ERROR', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyChargueService = spyOn(chargueService, 'getAllChargue').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    component.getAllCargues();
    expect(spyChargueService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate getAllSchedule OK', () => {
    const spyScheduleService = spyOn(scheduleService, 'getAllSchedule').and.returnValue(
      of(ManageUsersMock.mockListSchedule),
    );
    component.getAllSchedule();
    expect(spyScheduleService).toHaveBeenCalled();
    expect(component.listSchedule).toEqual(ManageUsersMock.mockListSchedule);
  });

  it('Validate getAllSchedule ERROR', () => {
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyScheduleService = spyOn(scheduleService, 'getAllSchedule').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    component.getAllSchedule();
    expect(spyScheduleService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });
});
