import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth/auth.service';
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class CheckLogin implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    console.log('Auth Guard Check Login');
    if (localStorage.getItem('user') !== null) {
      if (this.authService.getItemToken('firstLogin')) {
        localStorage.removeItem('user');
        return true;
      }
      this.router.navigateByUrl('/home');
      return false;
    } else {
      localStorage.removeItem('user');
      return true;
    }
  }
}
