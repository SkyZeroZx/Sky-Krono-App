import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SwalPortalTargets, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../services/users/user.service';
import { UserPhotoComponent } from './user-photo.component';
import * as helper from '../../../../common/helpers/helper';
import { of, throwError } from 'rxjs';
fdescribe('UserPhotoComponent', () => {
  let component: UserPhotoComponent;
  let fixture: ComponentFixture<UserPhotoComponent>;
  let userService: UserService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPhotoComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        CommonModule,
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
        SweetAlert2Module.forRoot(),
      ],
      providers: [
        ToastrService,
        UserService,
        SwalPortalTargets,
        { provide: ToastrService, useClass: ToastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPhotoComponent);
    userService = TestBed.inject(UserService);
    toastrService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  });

  it('UserPhotoComponent create', () => {
    expect(component).toBeTruthy();
  });
  let mockEventFile = {
    target: {
      files: ['sdfksdflksdklflsdkflsdkm'],
    },
  };

  it('Validate userAvatarSelected OK', async () => {
    const funPreviewUrlFile = jasmine
      .createSpy('startAuthentication')
      .and.returnValue(Promise.resolve('Base64Mock'));
    spyOnProperty(helper, 'previewUrlFile', 'get').and.returnValue(funPreviewUrlFile);
    await component.userAvatarSelected(mockEventFile);
    expect(component.swalPhotoUser).toEqual('Base64Mock');
    expect(component.fileUserAvatar).toEqual('sdfksdflksdklflsdkflsdkm');
    expect(funPreviewUrlFile).toHaveBeenCalled();
  });

  it('Validate userAvatarSelected Error', async () => {
    const funPreviewUrlFile = jasmine
      .createSpy('startAuthentication')
      .and.returnValue(Promise.reject(new Error('Error')));
    spyOnProperty(helper, 'previewUrlFile', 'get').and.returnValue(funPreviewUrlFile);
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    await component.userAvatarSelected(mockEventFile);

    expect(funPreviewUrlFile).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });

  it('Validate uploadPhoto OK', () => {
    const spyUserService = spyOn(userService, 'uploadPhoto').and.returnValue(of(null));
    component.uploadPhoto();
    expect(spyUserService).toHaveBeenCalled();
    expect(component.inputUserPhoto).toEqual(component.swalPhotoUser);
  });

  it('Validate uploadPhoto ERROR', () => {
    const spyUserService = spyOn(userService, 'uploadPhoto').and.returnValue(
      throwError(() => new Error('Upload photo')),
    );
    const spyToastService = spyOn(toastrService, 'error').and.callThrough();
    component.uploadPhoto();
    expect(spyUserService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled();
  });
});
