import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth/auth.service';
import { CheckLogin } from './check-login.guard';

xdescribe('CheckLogin', () => {
  let checkLogin: CheckLogin;
  let authService: AuthService;
  let mockRouter = {
    routerState: { root: '' },
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, CommonModule],
      providers: [AuthService, { provide: Router, useValue: mockRouter }],
    });
    checkLogin = TestBed.inject(CheckLogin);
    authService = TestBed.inject(AuthService);
  });

  it('CheckLogin be created', () => {
    expect(checkLogin).toBeTruthy();
  });

  it('Validate CanActivate Not Exist User In Storage', () => {
    expect(checkLogin.canActivate()).toEqual(true);
  });

  it('Validate CanActivate User Exist & First Login', () => {
    spyOn(localStorage, 'getItem').and.returnValue('true');
    spyOn(authService, 'getItemToken').and.returnValue(true);
    expect(checkLogin.canActivate()).toEqual(true);
  });
});
