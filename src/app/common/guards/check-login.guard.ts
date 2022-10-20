import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

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
