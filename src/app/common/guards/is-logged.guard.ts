import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserLoginResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class IsLogged implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(): Observable<boolean> {
    console.log('Auth Guard IsLogin');
    return this.authService.user$.pipe(
      take(1),
      map((user: UserLoginResponse) =>
        user ? (console.log('user', user), true) : (console.log('user', false), false),
      ),
    );
  }
}
