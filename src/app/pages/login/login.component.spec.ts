import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
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
import * as simpleWebAuthn from '@simplewebauthn/browser';
import { LoginComponent } from './login.component';
import { AuthLayoutRoutes } from '../../layouts/auth-layout/auth-layout.routing';
import { LoginMock } from './login.mock.spec';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let swPush: SwPush;
  let authService: AuthService;
  let toastrService: ToastrService;
  let themeService: ThemeService;
  let mockRouter = {
    routerState: { root: '' },
    navigate: jasmine.createSpy('navigate'),
  };
  let mockServiceWorker = {
    requestSubscription: jasmine.createSpy('requestSubscription'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        CommonModule,
        RouterModule.forChild(AuthLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        SweetAlert2Module.forRoot(),
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
    fixture = TestBed.createComponent(LoginComponent);
    swPush = TestBed.inject(SwPush);
    authService = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
    themeService = TestBed.inject(ThemeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('LoginComponent Create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyLocalStorage = spyOn(localStorage, 'removeItem').and.callThrough();
    const spyCreateFormLogin = spyOn(component, 'createFormLogin').and.callThrough();
    component.ngOnInit();
    expect(spyLocalStorage).toHaveBeenCalledWith('user');
    expect(spyCreateFormLogin).toHaveBeenCalled();
  });

  it('Validate login OK', () => {
    const spyAuthService = spyOn(authService, 'login').and.returnValue(
      of(LoginMock.userNotFirstLogin),
    );
    const spyIsFirstLogin = spyOn(component, 'isFirstLogin').and.callThrough();
    const spyIsUserStorage = spyOn(component, 'isUserStorage').and.callThrough();
    component.onLogin();
    expect(spyIsFirstLogin).toHaveBeenCalled();
    expect(spyAuthService).toHaveBeenCalled();
    expect(spyIsUserStorage).toHaveBeenCalled();
  });

  it('Validate login ERROR', () => {
    const spyAuthService = spyOn(authService, 'login').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToastrService = spyOn(toastrService, 'error').and.callThrough();
    component.onLogin();
    expect(spyToastrService).toHaveBeenCalled();
    expect(spyAuthService).toHaveBeenCalled();
  });

  it('Validate confirmFirstLogin', () => {
    const spyRouter = spyOn(mockRouter, 'navigate').and.callThrough();
    component.confirmFirstLogin();
    expect(spyRouter).toHaveBeenCalledWith(['/change-password']);
  });

  it('Validate dismissFirstLogin', () => {
    const spyLocalStorageRemove = spyOn(localStorage, 'removeItem').and.callThrough();
    component.dismissFirstLogin();
    expect(spyLocalStorageRemove).toHaveBeenCalledWith('user');
  });

  it('Validate isFirstLogin TRUE', () => {
    const spySwalIsFirstLogin = spyOn(
      component.swalIsFirstLogin,
      'fire',
    ).and.callThrough();
    component.isFirstLogin(LoginMock.userFirstLogin);
    expect(spySwalIsFirstLogin).toHaveBeenCalled();
  });

  it('Validate isFirstLogin FALSE', () => {
    component.loginForm.patchValue({ username: LoginMock.userNotFirstLogin.username });
    const spySwalIsFirstLogin = spyOn(
      component.swalIsFirstLogin,
      'fire',
    ).and.callThrough();
    const spyRouterNavigate = spyOn(mockRouter, 'navigate').and.callThrough();
    const spyLocalStorage = spyOn(localStorage, 'setItem').and.callThrough();
    component.isFirstLogin(LoginMock.userNotFirstLogin);
    expect(spySwalIsFirstLogin).not.toHaveBeenCalled();
    expect(spyRouterNavigate).toHaveBeenCalledWith(['/home']);
    expect(spyLocalStorage).toHaveBeenCalledWith(
      'username',
      LoginMock.userNotFirstLogin.username,
    );
  });

  it('Validate isUserStorage', () => {
    const mockUserStorage = 'UserTestStorage';
    component.userStorage = mockUserStorage;
    component.loginForm.controls.username.setValue(mockUserStorage + 'something');
    const spyLocalStorage = spyOn(localStorage, 'setItem').and.callThrough();
    component.isUserStorage();
    expect(spyLocalStorage).toHaveBeenCalledWith('verified', 'null');
  });

  it('Validate startAutehntication OK', fakeAsync(() => {
    const spyVerifityAuthentication = spyOn(
      component,
      'verifityAuthentication',
    ).and.callThrough();
    const spyStartAuthenticationService = spyOn(
      authService,
      'startAuthentication',
    ).and.returnValue(of(LoginMock.publicKeyCredentialRequestOptionsJSON));
    const funStartAuthentication = jasmine
      .createSpy('startAuthentication')
      .and.returnValue(Promise.resolve(LoginMock.authenticationCredentialJSON));
    spyOnProperty(simpleWebAuthn, 'startAuthentication', 'get').and.returnValue(
      funStartAuthentication,
    );
    component.startAuthentication();
    tick(1000);
    expect(spyStartAuthenticationService).toHaveBeenCalled();
    expect(funStartAuthentication).toHaveBeenCalled();
    expect(spyVerifityAuthentication).toHaveBeenCalled();
  }));

  it('Validate startAutehntication ERROR', fakeAsync(() => {
    // Service Error
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyStartAuthenticationService = spyOn(
      authService,
      'startAuthentication',
    ).and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );

    component.startAuthentication();
    expect(spyStartAuthenticationService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalledTimes(1);
    flush();
    // Web Authn Error
    spyStartAuthenticationService.and.returnValue(
      of(LoginMock.publicKeyCredentialRequestOptionsJSON),
    );
    const funStartAuthentication = jasmine
      .createSpy('startAuthentication')
      .and.returnValue(Promise.reject(new Error('Error')));
    spyOnProperty(simpleWebAuthn, 'startAuthentication', 'get').and.returnValue(
      funStartAuthentication,
    );
    component.startAuthentication();
    tick(1000);
    expect(funStartAuthentication).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalledTimes(2);
    flush();
  }));

  it('Validate verifityAuthentication OK', () => {
    const mockData: any = {};
    const spyVerifityAuthentication = spyOn(
      authService,
      'verifityAuthentication',
    ).and.returnValue(of(LoginMock.verifyAuthenticationOK));
    const spyIsFirstLogin = spyOn(component, 'isFirstLogin').and.callThrough();
    component.verifityAuthentication(mockData);
    expect(spyVerifityAuthentication).toHaveBeenCalled();
    expect(spyIsFirstLogin).toHaveBeenCalledWith(LoginMock.verifyAuthenticationOK.data);
  });

  it('Validate verifityAuthentication ERROR', () => {
    //Error WebAuthentication
    const mockData: any = {};
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    const spyVerifityAuthentication = spyOn(
      authService,
      'verifityAuthentication',
    ).and.returnValue(of(LoginMock.verifyAuthenticationError));
    const spyIsFirstLogin = spyOn(component, 'isFirstLogin').and.callThrough();
    component.verifityAuthentication(mockData);
    expect(spyVerifityAuthentication).toHaveBeenCalled();
    expect(spyIsFirstLogin).not.toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
    //Error Service

    spyVerifityAuthentication.and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    component.verifityAuthentication(mockData);
    expect(spyVerifityAuthentication).toHaveBeenCalledTimes(2);
    expect(spyToastService).toHaveBeenCalledTimes(2);
  });
});
