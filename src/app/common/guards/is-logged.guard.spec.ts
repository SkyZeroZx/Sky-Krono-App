import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth/auth.service';
import { IsLogged } from './is-logged.guard';

xdescribe('IsLogged', () => {
  let isLogged: IsLogged;
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
    isLogged = TestBed.inject(IsLogged);
    authService = TestBed.inject(AuthService);
    jasmine.getEnv().allowRespy(true);
  });

  it('IsLogged be created', () => {
    expect(isLogged).toBeTruthy();
  });

  it('Validate CanActivate Not Exist User In Storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('true');
    expect(isLogged.canActivate()).toBeTruthy();

    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(isLogged.canActivate()).toBeFalsy();
  });
});
