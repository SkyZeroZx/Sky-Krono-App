import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ResponseMock } from '../mocks/response.mock.spec';
import { UserServiceMock } from '../mocks/user.service.mock.spec';
import { UserService } from './user.service';

fdescribe('UserService', () => {
  let userService: UserService;
  let httpClientSpyPost: { post: jasmine.Spy };
  let httpClientSpyGet: { get: jasmine.Spy };
  let httpClientSpyPatch: { patch: jasmine.Spy };
  let httpClientSpyDelete: { delete: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    userService = TestBed.inject(UserService);
  });

  beforeEach(() => {
    httpClientSpyPost = jasmine.createSpyObj('HttpClient', ['post']);
    httpClientSpyGet = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpyPatch = jasmine.createSpyObj('HttpClient', ['patch']);
    httpClientSpyDelete = jasmine.createSpyObj('HttpClient', ['delete']);
  });

  afterEach((done: DoneFn) => {
    done();
  });

  it('UserService be created', () => {
    expect(userService).toBeTruthy();
  });

  it('Validate createUser', (done: DoneFn) => {
    httpClientSpyPost.post.and.returnValue(of(ResponseMock.genericResponse));
    userService = new UserService(httpClientSpyPost as any);
    userService.createUser(UserServiceMock.userUpdate).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });

  it('Validate updateUser', (done: DoneFn) => {
    httpClientSpyPatch.patch.and.returnValue(of(ResponseMock.genericResponse));
    userService = new UserService(httpClientSpyPatch as any);
    userService.updateUser(UserServiceMock.userUpdate).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });

  it('Validate uploadPhoto', (done: DoneFn) => {
    httpClientSpyPost.post.and.returnValue(of(ResponseMock.genericResponse));
    userService = new UserService(httpClientSpyPost as any);
    userService.uploadPhoto(UserServiceMock.filePhotoUser).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });

  it('Validate deleteUser', (done: DoneFn) => {
    httpClientSpyDelete.delete.and.returnValue(of(ResponseMock.genericResponse));
    userService = new UserService(httpClientSpyDelete as any);
    userService.deleteUser(UserServiceMock.userUpdate.id).subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });

  it('Validate resetUserPassword', (done: DoneFn) => {
    httpClientSpyPost.post.and.returnValue(of(ResponseMock.genericResponse));
    userService = new UserService(httpClientSpyPost as any);
    userService.resetUserPassword('user-unit-test@example.com').subscribe((res) => {
      expect(res).toEqual(ResponseMock.genericResponse);
      done();
    });
  });
});
