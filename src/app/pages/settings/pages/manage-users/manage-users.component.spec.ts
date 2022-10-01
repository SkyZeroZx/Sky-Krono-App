import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Constant } from '../../../../common/constants/Constant';
import { ReporteService } from '../../../../services/report/report.service';
import { UserService } from '../../../../services/users/user.service';
import { ManageUsersComponent } from './manage-users.component';
import { ManageUsersMock } from './manage-users.mock.spec';
import { ManageUsersRouter } from './manage-users.routing';

fdescribe('ManageUsersComponent', () => {
  let component: ManageUsersComponent;
  let fixture: ComponentFixture<ManageUsersComponent>;
  let reporteService: ReporteService;
  let toastrService: ToastrService;
  let userService: UserService;
  const { username, id } = ManageUsersMock.userMock;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ManageUsersComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        CommonModule,
        RouterModule.forChild(ManageUsersRouter),
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
      ],
      providers: [
        ToastrService,
        ReporteService,
        UserService,
        FormBuilder,
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersComponent);
    component = fixture.componentInstance;
    reporteService = TestBed.inject(ReporteService);
    toastrService = TestBed.inject(ToastrService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('ManageUsersComponent Create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateFormFilterUsers = spyOn(
      component,
      'createFormFilterUsers',
    ).and.callThrough();
    const spyGetAllUsers = spyOn(component, 'getAllUsers').and.callThrough();
    component.ngOnInit();
    expect(spyCreateFormFilterUsers).toHaveBeenCalled();
    expect(spyGetAllUsers).toHaveBeenCalled();
  });

  it('Validate exportPdf', () => {
    Constant.REPORT = ManageUsersMock.listUsersMock;
    const spyExportAsPDF = spyOn(reporteService, 'exportAsPDF').and.callThrough();
    component.exportPdf();
    expect(spyExportAsPDF).toHaveBeenCalled();
  });

  it('Validate showModalUpdateUser', () => {
    const spyShowModal = spyOn(component.modalUpdateUser, 'show').and.callThrough();
    component.showModalUpdateUser(ManageUsersMock.userMock);
    expect(component.userSelected).toEqual(ManageUsersMock.userMock);
    expect(spyShowModal).toHaveBeenCalled();
    expect(component.editUserOk).toBeTruthy();
  });

  it('Validate onChangeForm', () => {
    component.onChangeForm();
    expect(component.p).toEqual(1);
  });

  it('Validate getAllUsers OK', () => {
    const spyUserService = spyOn(userService, 'getAllUsers').and.returnValue(
      of(ManageUsersMock.listUsersMock),
    );
    component.getAllUsers();
    expect(component.listUsersOk).toBeTruthy();
    expect(component.listUsers).toEqual(ManageUsersMock.listUsersMock);
    expect(spyUserService).toHaveBeenCalled();
  });

  it('Validate getAllUsers ERROR', () => {
    const spyUserService = spyOn(userService, 'getAllUsers').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    component.getAllUsers();
    expect(spyUserService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate resetUserPassword OK', () => {
    const spyUserService = spyOn(userService, 'resetUserPassword').and.returnValue(
      of(null),
    );
    const spyGetAllUsers = spyOn(userService, 'getAllUsers').and.callThrough();
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    component.resetUserPassword(username);

    expect(spyUserService).toHaveBeenCalledWith(username);
    expect(spyGetAllUsers).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate resetUserPassword ERROR', () => {
    const spyUserService = spyOn(userService, 'resetUserPassword').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    component.resetUserPassword(username);

    expect(spyUserService).toHaveBeenCalledWith(username);
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate deleteUser OK', () => {
    const spyDeleteUser = spyOn(userService, 'deleteUser').and.returnValue(of(null));
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    const spyGetAllUsers = spyOn(userService, 'getAllUsers').and.callThrough();
    component.deleteUser(id);
    expect(spyDeleteUser).toHaveBeenCalledWith(id);
    expect(component.p).toEqual(1);
    expect(spyToastService).toHaveBeenCalled();
    expect(spyGetAllUsers).toHaveBeenCalled();
  });

  it('Validate deleteUser OK', () => {
    const spyDeleteUser = spyOn(userService, 'deleteUser').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    component.deleteUser(id);
    expect(spyDeleteUser).toHaveBeenCalledWith(id);
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate showModalCreateUser', () => {
    const spyShowModal = spyOn(component.modalCreateUser, 'show').and.callThrough();
    component.showModalCreateUser();
    expect(component.createUserOk).toBeTruthy();
    expect(spyShowModal).toHaveBeenCalled();
  });
});
