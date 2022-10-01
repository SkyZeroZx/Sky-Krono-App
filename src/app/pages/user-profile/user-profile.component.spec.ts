import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SwPush } from '@angular/service-worker';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';
import { UserService } from '../../services/users/user.service';
import { UserOptionsComponent } from './components/user-options/user-options.component';
import { UserPhotoComponent } from './components/user-photo/user-photo.component';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileMock } from './user-profile.mock.spec';
import { UserProfileRouter } from './user-profile.routing';

fdescribe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let swPush: SwPush;
  let authService: AuthService;
  let toastrService: ToastrService;
  let userService: UserService;
  let mockRouter = {
    routerState: { root: '' },
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent, UserOptionsComponent, UserPhotoComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        CommonModule,
        RouterModule.forChild(UserProfileRouter),
        FormsModule,
        ReactiveFormsModule,
        SweetAlert2Module.forRoot(),
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
        { provide: SwPush, useValue: UserProfileMock.mockServiceWorker },
        { provide: Router, useValue: mockRouter },
        ReactiveFormsModule,
        { provide: ToastrService, useClass: ToastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    swPush = TestBed.inject(SwPush);
    authService = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('UserProfileComponent be Create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate ngOnInit', () => {
    const spyCreateUserProfileForm = spyOn(
      component,
      'createUserProfileForm',
    ).and.callThrough();
    const spyGetProfile = spyOn(component, 'getProfile').and.callThrough();
    component.ngOnInit();
    expect(spyGetProfile).toHaveBeenCalled();
    expect(spyCreateUserProfileForm).toHaveBeenCalled();
  });

  it('Validate getProfile OK', () => {
    const spyGetProfile = spyOn(userService, 'getProfile').and.returnValue(
      of(UserProfileMock.userProfileMock),
    );
    const spyPatchValue = spyOn(
      component.userProfileForm,
      'patchValue',
    ).and.callThrough();
    component.getProfile();
    expect(spyGetProfile).toHaveBeenCalled();
    expect(spyPatchValue).toHaveBeenCalledWith(UserProfileMock.userProfileMock);
  });

  it('Validate getProfile ERROR', () => {
    const spyGetProfile = spyOn(userService, 'getProfile').and.returnValue(
      throwError(() => new Error('Error')),
    );
    const spyToastError = spyOn(toastrService, 'error').and.callThrough();
    component.getProfile();
    expect(spyToastError).toHaveBeenCalled();
    expect(spyGetProfile).toHaveBeenCalled();
  });

  it('Validate onLogout', () => {
    const spyRouterNavigate = spyOn(mockRouter, 'navigate').and.callThrough();
    const spyAuthService = spyOn(authService, 'logout').and.callFake(() => {});
    const spyLocalStorageRemoveItem = spyOn(localStorage, 'removeItem').and.callThrough();
    component.logout();
    expect(spyRouterNavigate).toHaveBeenCalledWith(['/login']);
    expect(spyAuthService).toHaveBeenCalled();
    expect(spyLocalStorageRemoveItem).toHaveBeenCalled();
  });

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
  });
});
