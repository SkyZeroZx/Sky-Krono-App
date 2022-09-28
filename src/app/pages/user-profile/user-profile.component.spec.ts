import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SwPush } from '@angular/service-worker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';
import { UserService } from '../../services/users/user.service';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileMock } from './user-profile.mock.spec';
import { UserProfileRouter } from './user-profile.routing';
import * as simpleWebAuthn from '@simplewebauthn/browser';
import Swal from 'sweetalert2';

xdescribe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let swPush: SwPush;
  let authService: AuthService;
  let toastrService: ToastrService;
  let userService: UserService;
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
      declarations: [UserProfileComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        CommonModule,
        RouterModule.forChild(UserProfileRouter),
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
        MatSliderModule,
        MatSlideToggleModule,
        MatNativeDateModule,
        MatRippleModule,
        MatSlideToggleModule,
      ],
      providers: [
        ToastrService,
        AuthService,
        UserService,
        ThemeService,
        SwPush,
        FormBuilder,
        DatePipe,
        { provide: SwPush, useValue: mockServiceWorker },
        { provide: Router, useValue: mockRouter },
        ReactiveFormsModule,
        { provide: ToastrService, useClass: ToastrService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    swPush = TestBed.inject(SwPush);
    authService = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
    userService = TestBed.inject(UserService);
    themeService = TestBed.inject(ThemeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });
/*
  it('UserProfileComponent be Create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateUserProfileForm = spyOn(
      component,
      'createUserProfileForm',
    ).and.callThrough();
    const spySuscribeChange = spyOn(component, 'suscribeChange').and.callThrough();
    component.ngOnInit();
    expect(spySuscribeChange).toHaveBeenCalled();
    expect(spyCreateUserProfileForm).toHaveBeenCalled();
  });

  it('Validate createUserProfileForm', () => {
    const spySetUserProfile = spyOn(component, 'setProfileUser').and.callThrough();
    component.createUserProfileForm();
    expect(spySetUserProfile).toHaveBeenCalled();
  });

  it('Validate setProfileUser OK', () => {
    const spyGetProfile = spyOn(userService, 'getProfile').and.returnValue(
      of(UserProfileMock.userProfileMock),
    );
    const spyPatchValue = spyOn(
      component.userProfileForm,
      'patchValue',
    ).and.callThrough();
    component.setProfileUser();
    expect(spyGetProfile).toHaveBeenCalled();
    expect(spyPatchValue).toHaveBeenCalledWith(UserProfileMock.userProfileMock);
  });

  it('Validate setProfileUser ERROR', () => {
    const spyGetProfile = spyOn(userService, 'getProfile').and.returnValue(
      throwError(() => new Error('Error')),
    );
    const spyToastError = spyOn(toastrService, 'error').and.callThrough();
    component.setProfileUser();
    expect(spyToastError).toHaveBeenCalled();
    expect(spyGetProfile).toHaveBeenCalled();
  });

  it('Validate suscribeChange', fakeAsync(() => {
    spyOn(component, 'shouldInstall').and.returnValue(true);

    fixture.detectChanges();
    const spySetTheme = spyOn(themeService, 'setTheme').and.callThrough();
    const spySetNavBar = spyOn(themeService, 'setNavBar').and.callThrough();
    const spyGetRegistrationAuthnWeb = spyOn(component, 'getRegistrationAuthnWeb');
    const spyInstallPwa = spyOn(component, 'installPwa').and.returnValue(null);
    const spyLocalStorage = spyOn(localStorage, 'setItem').and.callThrough();
    const spysuscribeToNotifications = spyOn(
      component,
      'suscribeToNotifications',
    ).and.returnValue(null);

    const element = fixture.nativeElement;
    const userThemeInput = element.querySelector('#userTheme-input');
    const userNavBarInput = element.querySelector('#userNavBar-input');
    const userFingerPrintInput = element.querySelector('#userFingerPrint-input');
    const installPWAControlInput = element.querySelector('#installPWAControl-input');
    const notificationsControlInput = element.querySelector(
      '#notificationsControl-input',
    );
    userThemeInput.click();
    userNavBarInput.click();
    userFingerPrintInput.click();
    installPWAControlInput.click();
    notificationsControlInput.click();
    tick(1000);
    fixture.detectChanges();

    expect(spySetTheme).toHaveBeenCalledWith(true);
    expect(spySetNavBar).toHaveBeenCalledWith(true);
    expect(spyInstallPwa).toHaveBeenCalled();
    expect(spyLocalStorage).toHaveBeenCalledTimes(4);
    expect(spyGetRegistrationAuthnWeb).toHaveBeenCalled();
    expect(spysuscribeToNotifications).toHaveBeenCalled();

    userThemeInput.click();
    userNavBarInput.click();
    userFingerPrintInput.click();
    installPWAControlInput.click();
    notificationsControlInput.click();

    tick(1000);
    fixture.detectChanges();
    expect(spySetTheme).toHaveBeenCalledWith(false);
    expect(spySetNavBar).toHaveBeenCalledWith(false);
    expect(spyLocalStorage).toHaveBeenCalledTimes(9);
    expect(spyInstallPwa).not.toHaveBeenCalledTimes(2);
    expect(spyGetRegistrationAuthnWeb).not.toHaveBeenCalledTimes(2);
    expect(spysuscribeToNotifications).not.toHaveBeenCalledTimes(2);
  }));

  it('Validate suscribeToNotifications OK', fakeAsync(() => {
    const spySaveNotification = spyOn(component, 'saveNotification').and.callThrough();
    const spySwPush = spyOn(swPush, 'requestSubscription').and.returnValue(
      Promise.resolve(null),
    );

    component.suscribeToNotifications();

    tick(1000);
    expect(spySwPush).toHaveBeenCalledWith({
      serverPublicKey: environment.VAPID_PUBLIC_KEY,
    });
    expect(spySaveNotification).toHaveBeenCalled();
  }));

  it('Validate suscribeToNotifications ERROR', fakeAsync(() => {
    const spySaveNotification = spyOn(component, 'saveNotification').and.callThrough();
    const spyDisableNotificaciones = spyOn(
      component,
      'disableNotifications',
    ).and.callThrough();
    const spySwPush = spyOn(swPush, 'requestSubscription').and.returnValue(
      Promise.reject(null),
    );

    component.suscribeToNotifications();

    tick(1000);
    expect(spySwPush).toHaveBeenCalledWith({
      serverPublicKey: environment.VAPID_PUBLIC_KEY,
    });

    expect(spySaveNotification).not.toHaveBeenCalled();
    expect(spyDisableNotificaciones).toHaveBeenCalled();
    flush();
  }));

  it('Validate disableNotifications', () => {
    const spyNotifactionControl = spyOn(
      component.notificacionesControl,
      'setValue',
    ).and.callThrough();
    const spyLocalStorage = spyOn(localStorage, 'setItem').and.callThrough();

    component.disableNotifications();

    expect(spyNotifactionControl).toHaveBeenCalledWith(false, { emitEvent: false });
    expect(spyLocalStorage).toHaveBeenCalledWith('notificaciones', 'false');
  });

  it('Validate saveNotification OK', () => {
    const spySaveUserNotification = spyOn(
      userService,
      'saveUserNotification',
    ).and.returnValue(of(UserProfileMock.responseOk));
    const spyToast = spyOn(toastrService, 'success').and.callThrough();

    component.saveNotification(UserProfileMock.tokenMock);

    expect(spySaveUserNotification).toHaveBeenCalledWith(UserProfileMock.tokenMock);
    expect(spyToast).toHaveBeenCalled();
  });

  it('Validate saveNotification ERROR', () => {
    const spySaveUserNotification = spyOn(
      userService,
      'saveUserNotification',
    ).and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToast = spyOn(toastrService, 'error').and.callThrough();
    const spyDisableNotifications = spyOn(
      component,
      'disableNotifications',
    ).and.callThrough();

    component.saveNotification(UserProfileMock.tokenMock);

    expect(spySaveUserNotification).toHaveBeenCalledWith(UserProfileMock.tokenMock);
    expect(spyToast).toHaveBeenCalled();
    expect(spyDisableNotifications).toHaveBeenCalled();
  });

  it('Validate disableFingerPrint', () => {
    const spySetValueFinterPrint = spyOn(
      component.userFingerPrint,
      'setValue',
    ).and.callThrough();
    const spyLocalStorage = spyOn(localStorage, 'setItem').and.callThrough();
    component.disableFingerPrint();
    expect(spyLocalStorage).toHaveBeenCalledWith('verified', 'false');
    expect(spySetValueFinterPrint).toHaveBeenCalledWith(false, { emitEvent: false });
  });

  it('Validate getRegistrationAuthnWeb OK', fakeAsync(() => {
    const spyAuthService = spyOn(authService, 'getRegistrationAuthnWeb').and.returnValue(
      of(UserProfileMock.publicKeyCredentialCreationOptionsJSON),
    );

    const funStartRegistration = jasmine
      .createSpy('startRegistration')
      .and.returnValue(Promise.resolve(UserProfileMock.registrationCredentialJSON));
    spyOnProperty(simpleWebAuthn, 'startRegistration', 'get').and.returnValue(
      funStartRegistration,
    );

    const spyRegisterAuthnWeb = spyOn(component, 'registerAuthnWeb').and.callThrough();
    component.getRegistrationAuthnWeb();
    tick(2000);
    expect(spyAuthService).toHaveBeenCalled();
    expect(funStartRegistration).toHaveBeenCalledWith(
      UserProfileMock.publicKeyCredentialCreationOptionsJSON,
    );

    expect(spyRegisterAuthnWeb).toHaveBeenCalledWith(
      UserProfileMock.registrationCredentialJSON,
    );
    flush();
  }));

  it('Validate getRegistrationAuthnWeb ERROR WEB AUTHN', fakeAsync(() => {
    const spyAuthService = spyOn(authService, 'getRegistrationAuthnWeb').and.returnValue(
      of(UserProfileMock.publicKeyCredentialCreationOptionsJSON),
    );
    const spyRegisterAuthnWeb = spyOn(component, 'registerAuthnWeb').and.callThrough();
    const spySweetAlert = spyOn(Swal, 'fire').and.callThrough();
    const funStartRegistration = jasmine
      .createSpy('startRegistration')
      .and.returnValue(
        Promise.reject(new Error('The authenticator was previously registered')),
      );
    spyOnProperty(simpleWebAuthn, 'startRegistration', 'get').and.returnValue(
      funStartRegistration,
    );
    const spyStorageUserData = spyOn(component, 'storageUserData').and.callFake(() => {});

    component.getRegistrationAuthnWeb();
    tick(2000);

    expect(spyAuthService).toHaveBeenCalled();
    expect(funStartRegistration).toHaveBeenCalledWith(
      UserProfileMock.publicKeyCredentialCreationOptionsJSON,
    );
    expect(spyRegisterAuthnWeb).not.toHaveBeenCalled();
    expect(spyStorageUserData).toHaveBeenCalled();
    expect(spySweetAlert).toHaveBeenCalled();

    const spyDisableFingerPrint = spyOn(component, 'disableFingerPrint').and.callFake(
      () => {},
    );

    funStartRegistration.and.returnValue(Promise.reject(new Error('ERROR')));
    component.getRegistrationAuthnWeb();
    tick(2000);

    expect(spyDisableFingerPrint).toHaveBeenCalled();
    expect(spySweetAlert).toHaveBeenCalledTimes(2);
  }));

  it('Validate getRegistrationAuthnWeb ERROR SERVICE', fakeAsync(() => {
    const spyAuthService = spyOn(authService, 'getRegistrationAuthnWeb').and.returnValue(
      throwError(() => {
        new Error('Service Error');
      }),
    );
    const spyDisableFingerPrint = spyOn(component, 'disableFingerPrint').and.callFake(
      () => {},
    );

    component.getRegistrationAuthnWeb();
    expect(spyAuthService).toHaveBeenCalled();
    expect(spyDisableFingerPrint).toHaveBeenCalled();
  }));
  const mockData = {
    installEvent: {
      prompt: () => {},
      userChoice: Promise.resolve({ choiceResult: { outcome: 'accepted' } }),
    },
  };

  it('Validate  installPwa', fakeAsync(() => {
    themeService.promptEvent = {
      prompt: () => {},
    };
    const spyThemeService = spyOn(themeService.getInstallPwa, 'prompt').and.callThrough();
    component.installPwa();
    expect(spyThemeService).toHaveBeenCalled();
  }));

  it('Validate registerAuthnWeb OK', () => {
    const spyAuthService = spyOn(authService, 'verifyRegistration').and.returnValue(
      of(null),
    );
    const spyStorageUserData = spyOn(component, 'storageUserData').and.callFake(() => {});
    const spySweetAlert = spyOn(Swal, 'fire').and.callThrough();
    component.registerAuthnWeb(UserProfileMock.registrationCredentialJSON);

    expect(spyAuthService).toHaveBeenCalled();
    expect(spyStorageUserData).toHaveBeenCalled();
    expect(spySweetAlert).toHaveBeenCalledWith(
      'Exito',
      'Se registro exitosamente',
      'success',
    );
  });

  it('Validate registerAuthnWeb ERROR', () => {
    const spyAuthService = spyOn(authService, 'verifyRegistration').and.returnValue(
      throwError(() => new Error('ERROR')),
    );
    const spyDisableFingerPrint = spyOn(component, 'disableFingerPrint').and.callFake(
      () => {},
    );
    const spySweetAlert = spyOn(Swal, 'fire').and.callThrough();
    component.registerAuthnWeb(UserProfileMock.registrationCredentialJSON);

    expect(spyAuthService).toHaveBeenCalled();
    expect(spyDisableFingerPrint).toHaveBeenCalled();
    expect(spySweetAlert).toHaveBeenCalledWith(
      'Error',
      'Algo salio mal al registrarse',
      'error',
    );
  });

  it('Validate storageUserData', () => {
    localStorage.setItem('user', JSON.stringify(UserProfileMock.userProfileMock));
    const spyLocalStorage = spyOn(localStorage, 'setItem').and.callFake(() => {});
    component.storageUserData();
    expect(spyLocalStorage).toHaveBeenCalledWith('verified', 'true');
    expect(spyLocalStorage).toHaveBeenCalledTimes(2);
  });

  it('Validate onLogout', fakeAsync(async () => {
    const spySweetAlert = spyOn(Swal, 'fire').and.callThrough();
    const spyAuthService = spyOn(authService, 'logout').and.callFake(() => {});
    const spyLocalStorageRemoveItem = spyOn(localStorage, 'removeItem').and.callThrough();

    component.onLogout();

    expect(Swal.isVisible()).toBeTruthy();
    Swal.clickConfirm();
    tick(1000);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    expect(spyLocalStorageRemoveItem).toHaveBeenCalledWith('user');
    expect(spySweetAlert).toHaveBeenCalled();
    expect(spyAuthService).toHaveBeenCalled();
  }));

  it('Validate  updateProfile OK', () => {
    const spyUserService = spyOn(userService, 'updateUser').and.returnValue(
      of(UserProfileMock.responseOk),
    );
    const spyToastService = spyOn(toastrService, 'success').and.callThrough();
    component.updateProfile();

    expect(spyUserService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate  updateProfile ERROR', () => {
    const spyUserService = spyOn(userService, 'updateUser').and.returnValue(
      throwError(() => {
        new Error('Error');
      }),
    );
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    component.updateProfile();

    expect(spyUserService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });*/
});
