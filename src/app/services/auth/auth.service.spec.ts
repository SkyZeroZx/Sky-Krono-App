import { HttpClientTestingModule } from '@angular/common/http/testing';
import { flush, TestBed } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, of, take } from 'rxjs';
import { AuthServiceMock } from '../mocks/auth.service.mock.spec';
import { ResponseMock } from '../mocks/response.mock.spec';
import { AuthService } from './auth.service';
const helper = new JwtHelperService();
fdescribe('AuthService', () => {
  let authService: AuthService;
  let httpClientSpyPost: { post: jasmine.Spy; pipe: { map: jasmine.Spy } };
  let httpClientSpyGet: { get: jasmine.Spy };
  let httpClientSpyPatch: { patch: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    httpClientSpyPost = jasmine.createSpyObj('HttpClient', ['post']);
    httpClientSpyGet = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpyPatch = jasmine.createSpyObj('HttpClient', ['patch']);
  });
  afterEach((done: DoneFn) => {
    done();
  });

  it('AuthService be created', () => {
    expect(authService).toBeTruthy();
  });

  it('Validate login', (done: DoneFn) => {
    httpClientSpyPost.post.and.returnValue(of(AuthServiceMock.userLoginResponse));

    authService = new AuthService(httpClientSpyPost as any);
    authService.login(AuthServiceMock.userLogin).subscribe({
      next: (res) => {
        expect(res).toEqual(AuthServiceMock.userLoginResponse);
        done();
      },
    });
  });

  it('Validate verifityAuthentication', (done: DoneFn) => {
    let mockData = {
      test: '',
      dataTest: '',
    };
    httpClientSpyPost.post.and.returnValue(of(AuthServiceMock.userDataWebAuthn));

    authService = new AuthService(httpClientSpyPost as any);
    authService.verifityAuthentication(mockData).subscribe({
      next: (res) => {
        expect(res).toEqual(AuthServiceMock.userDataWebAuthn);
        done();
      },
    });
  });

  it('Validate ChangePassword', (done: DoneFn) => {
    httpClientSpyPost.post.and.returnValue(of(ResponseMock.genericResponse));

    authService = new AuthService(httpClientSpyPost as any);
    authService.changePassword(AuthServiceMock.changePassword).subscribe({
      next: (res) => {
        expect(res).toEqual(ResponseMock.genericResponse);
        done();
      },
    });
  });

  it('Validate getRegistrationAuthnWeb', (done: DoneFn) => {
    httpClientSpyGet.get.and.returnValue(
      of(AuthServiceMock.publicKeyCredentialCreationOptionsJSON),
    );

    authService = new AuthService(httpClientSpyGet as any);
    authService.getRegistrationAuthnWeb().subscribe({
      next: (res) => {
        expect(res).toEqual(AuthServiceMock.publicKeyCredentialCreationOptionsJSON);
        done();
      },
    });
  });

  it('Validate verifyRegistration', (done: DoneFn) => {
    httpClientSpyPost.post.and.returnValue(of(null));
    authService = new AuthService(httpClientSpyPost as any);
    authService.verifyRegistration(AuthServiceMock.registrationCredentialJSON).subscribe({
      next: (res) => {
        expect(res).toEqual(null);
        done();
      },
    });
  });

  it('Validate startAuthentication', (done: DoneFn) => {
    const username = 'SkyZeroZx';
    httpClientSpyPost.post.and.returnValue(of(null));
    authService = new AuthService(httpClientSpyPost as any);
    authService.startAuthentication(username).subscribe({
      next: (res) => {
        expect(res).toEqual(null);
        done();
      },
    });
  });

  it('Validate userValue', () => {
    //Init with null value
    expect(authService.userValue).toEqual(null);
  });

  it('Validate get user$', (done: DoneFn) => {
    httpClientSpyPost.post.and.returnValue(of(AuthServiceMock.userLoginResponse));

    authService = new AuthService(httpClientSpyPost as any);
    authService.login(AuthServiceMock.userLogin).subscribe({
      next: (res) => {
        expect(res).toEqual(AuthServiceMock.userLoginResponse);
        authService.user$.pipe(
          map((user) => {
            expect(user).toEqual(AuthServiceMock.userLoginResponse);
            done();
          }),
        );
        done();
      },
    });
  });
});
