import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SwPush } from '@angular/service-worker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';
import { AuthLayoutRoutes } from '../../layouts/auth-layout/auth-layout.routing';
import { ChangePasswordComponent } from './change-password.component';
import { Location } from '@angular/common';

fdescribe('UserProfileComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let swPush: SwPush;
  let authService: AuthService;
  let toastrService: ToastrService;
  let themeService: ThemeService;
  let location: Location;
  let mockRouter = {
    routerState: { root: '' },
    navigate: jasmine.createSpy('navigate'),
  };
  let mockServiceWorker = {
    requestSubscription: jasmine.createSpy('requestSubscription'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        CommonModule,
        RouterModule.forChild(AuthLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
      ],
      providers: [
        ToastrService,
        AuthService,
        ThemeService,
        FormBuilder,
        DatePipe,
        { provide: Router, useValue: mockRouter },
        ReactiveFormsModule,
        { provide: SwPush, useValue: mockServiceWorker },
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    swPush = TestBed.inject(SwPush);
    authService = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
    themeService = TestBed.inject(ThemeService);
    location = TestBed.inject(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('ChangePasswordComponent Create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateFormChangePassword = spyOn(
      component,
      'createFormChangePassword',
    ).and.callThrough();
    component.ngOnInit();
    expect(spyCreateFormChangePassword).toHaveBeenCalled();
  });

  it('Validate onChangePassword SamePassword', () => {
    component.changePasswordForm.patchValue({
      newPassword: 'Admin12345',
      confirmedPassword: 'Admin12345',
    });
    component.onChangePassword();
    expect(component.diferent).toBeFalsy();
  });

  it('Validate onChangePassword Diferent', () => {
    component.changePasswordForm.patchValue({
      newPassword: 'Admin12345',
      confirmedPassword: 'SomeThingDiferent',
    });
    component.onChangePassword();
    expect(component.diferent).toBeTruthy();
  });

  it('Validate onChangePassword OK FirstLogin', () => {
    const spyChangePassword = spyOn(authService, 'changePassword').and.returnValue(
      of(null),
    );
    const spyAuthServiceFirstLogin = spyOn(authService, 'getItemToken').and.returnValue(
      true,
    );
    const spyRouterNavigate = spyOn(mockRouter, 'navigate').and.callThrough();
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    const spyLogout = spyOn(authService, 'logout').and.callThrough();
    component.onChangePassword();
    expect(spyAuthServiceFirstLogin).toHaveBeenCalled();
    expect(spyChangePassword).toHaveBeenCalled();
    expect(spyRouterNavigate).toHaveBeenCalledWith(['/login']);
    expect(spyToastService).toHaveBeenCalled();
    expect(spyLogout).toHaveBeenCalled();
  });

  it('Validate onChangePassword OK NOT FirstLogin', () => {
    const spyChangePassword = spyOn(authService, 'changePassword').and.returnValue(
      of(null),
    );
    const spyAuthServiceFirstLogin = spyOn(authService, 'getItemToken').and.returnValue(
      false,
    );
    const spyRouterNavigate = spyOn(mockRouter, 'navigate').and.callThrough();
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    const spyLogout = spyOn(authService, 'logout').and.callThrough();
    component.onChangePassword();
    expect(spyAuthServiceFirstLogin).toHaveBeenCalled();
    expect(spyChangePassword).toHaveBeenCalled();
    expect(spyRouterNavigate).toHaveBeenCalledWith(['/home']);
    expect(spyToastService).toHaveBeenCalled();
    expect(spyLogout).not.toHaveBeenCalled();
  });

  it('Validate onChangePassword ERROR', () => {
    const spyChangePassword = spyOn(authService, 'changePassword').and.returnValue(
      throwError(() => new Error('Error')),
    );
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    component.onChangePassword();
    expect(spyChangePassword).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate goBack', () => {
    const spyBack = spyOn(location, 'back').and.callThrough();
    component.goBack();
    expect(spyBack).toHaveBeenCalled();
  });
});
