import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { UserOptionsComponent } from './user-options.component';
import * as simpleWebAuthn from '@simplewebauthn/browser';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SwPush } from '@angular/service-worker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth/auth.service';
import { ThemeService } from '../../../../services/theme/theme.service';
import { UserService } from '../../../../services/users/user.service';
import { UserProfileRouter } from '../../user-profile.routing';
import { UserProfileMock } from '../../user-profile.mock.spec';
import Swal from 'sweetalert2';
import { of, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';

fdescribe('UserOptionsComponent', () => {
  let component: UserOptionsComponent;
  let fixture: ComponentFixture<UserOptionsComponent>;
  let authService: AuthService;
  let swPush: SwPush;
  let themeService: ThemeService;
  let userService: UserService;
  let toastrService: ToastrService;
  let mockCheckEvent: any = {
    checked: true,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserOptionsComponent],
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
        { provide: SwPush, useValue: UserProfileMock.mockServiceWorker },
        { provide: ToastrService, useClass: ToastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOptionsComponent);
    swPush = TestBed.inject(SwPush);
    themeService = TestBed.inject(ThemeService);
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
    toastrService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('UserOptionsComponent create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate onChangeTheme', () => {
    const spyThemeService = spyOn(themeService, 'setTheme').and.callThrough();
    component.onChangeTheme(mockCheckEvent);
    expect(spyThemeService).toHaveBeenCalledWith(mockCheckEvent.checked);
  });

  it('Validate onChangeFinterPrint is Checked', () => {
    const spyGetRegistrationAuthnWeb = spyOn(
      component,
      'getRegistrationAuthnWeb',
    ).and.callThrough();
    const spyLocalStorage = spyOn(localStorage, 'setItem').and.callThrough();
    const spyDisableFingerPrint = spyOn(
      component,
      'disableFingerPrint',
    ).and.callThrough();
    component.onChangeFinterPrint({ checked: true });
    expect(spyLocalStorage).toHaveBeenCalledWith('verified', true as any);
    expect(spyDisableFingerPrint).not.toHaveBeenCalled();
    expect(spyGetRegistrationAuthnWeb).toHaveBeenCalled();
  });

  it('Validate onChangeFinterPrint is Not Checked', () => {
    const spyGetRegistrationAuthnWeb = spyOn(
      component,
      'getRegistrationAuthnWeb',
    ).and.callThrough();
    const spyLocalStorage = spyOn(localStorage, 'setItem').and.callThrough();
    const spyDisableFingerPrint = spyOn(
      component,
      'disableFingerPrint',
    ).and.callThrough();
    component.onChangeFinterPrint({ checked: false });
    expect(spyLocalStorage).toHaveBeenCalledWith('verified', 'false');
    expect(spyDisableFingerPrint).toHaveBeenCalled();
    expect(spyGetRegistrationAuthnWeb).not.toHaveBeenCalled();
  });

  it('Validate onChangeNavBar', () => {
    const spyThemeServiceSetNavBar = spyOn(themeService, 'setNavBar').and.callThrough();
    component.onChangeNavBar(mockCheckEvent);
    expect(spyThemeServiceSetNavBar).toHaveBeenCalled();
  });

  it('Validate onChangeInstallPwa', () => {
    const spyInstallPwa = spyOn(component, 'installPwa').and.returnValue(null);
    component.onChangeInstallPwa({ checked: true });
    expect(spyInstallPwa).toHaveBeenCalled();
  });

  it('Validate onChangeNotifications is Checked', () => {
    const spySuscribeToNotifications = spyOn(
      component,
      'suscribeToNotifications',
    ).and.returnValue(null);
    const spyLocalStorage = spyOn(localStorage, 'setItem').and.callThrough();
    component.onChangeNotifications({ checked: true });
    expect(spySuscribeToNotifications).toHaveBeenCalled();
    expect(spyLocalStorage).toHaveBeenCalledWith('notificaciones', 'true');
  });

  it('Validate onChangeNotifications is Not Checked', () => {
    const spySuscribeToNotifications = spyOn(
      component,
      'suscribeToNotifications',
    ).and.returnValue(null);
    const spyLocalStorage = spyOn(localStorage, 'setItem').and.callThrough();
    component.onChangeNotifications({ checked: false });
    expect(spySuscribeToNotifications).not.toHaveBeenCalled();
    expect(spyLocalStorage).toHaveBeenCalledWith('notificaciones', 'false');
  });

  it('Validate installPwa', () => {
    themeService.promptEvent = {
      prompt: function () {},
    };
    const spyThemeService = spyOn(themeService.getInstallPwa, 'prompt').and.callFake(
      () => {},
    );
    component.installPwa();
    expect(spyThemeService).toHaveBeenCalled();
  });

  it('Validate disableFingerPrint', () => {
    const spySetValueFinterPrint = spyOn(
      component.userOptionsForm.controls.userFingerPrint,
      'setValue',
    ).and.callThrough();
    const spyLocalStorage = spyOn(localStorage, 'setItem').and.callThrough();
    component.disableFingerPrint();
    expect(spyLocalStorage).toHaveBeenCalledWith('verified', 'false');
    expect(spySetValueFinterPrint).toHaveBeenCalledWith(false, { emitEvent: false });
  });

  it('validatePreviusRegisterWebAuthn is Previous Register', () => {
    const mockError = 'The authenticator was previously registered , something etc';
    const spySwalFired = spyOn(Swal, 'fire').and.callThrough();
    const spyStorageUserData = spyOn(component, 'storageUserData').and.returnValue(null);
    component.validatePreviusRegisterWebAuthn(mockError);
    expect(spySwalFired).toHaveBeenCalledWith(
      '',
      'Su dispositivo ya se encuentra registrado',
      'info',
    );
    expect(spyStorageUserData).toHaveBeenCalled();
  });

  it('validatePreviusRegisterWebAuthn is NOT Previous Register', () => {
    const mockError = 'Error not enabled WebAuthentication in your browser';
    const spySwalFired = spyOn(Swal, 'fire').and.callThrough();
    const spyDisableFingerPrint = spyOn(component, 'disableFingerPrint').and.returnValue(
      null,
    );
    component.validatePreviusRegisterWebAuthn(mockError);
    expect(spySwalFired).toHaveBeenCalledWith(
      'Error',
      'Algo salio mal al registrarse',
      'error',
    );
    expect(spyDisableFingerPrint).toHaveBeenCalled();
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

    const spyDisableFingerPrint = spyOn(component, 'disableFingerPrint').and.callFake(
      () => {},
    );

    funStartRegistration.and.returnValue(Promise.reject(new Error('ERROR')));
    component.getRegistrationAuthnWeb();
    tick(2000);

    expect(spyDisableFingerPrint).toHaveBeenCalled();
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

  it('Validate storageUserData', () => {
    localStorage.setItem('user', JSON.stringify(UserProfileMock.userProfileMock));
    const spyLocalStorage = spyOn(localStorage, 'setItem').and.callFake(() => {});
    component.storageUserData();
    expect(spyLocalStorage).toHaveBeenCalledWith('verified', 'true');
    expect(spyLocalStorage).toHaveBeenCalledTimes(2);
  });

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
});
