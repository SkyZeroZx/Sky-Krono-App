import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckLogin implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate() {
    console.log('Auth Guard Check Login');
    if (localStorage.getItem('user') !== null) {
      if (this.authService.getItemToken('firstLogin')) {
        localStorage.removeItem('user');
        return true;
      }
      /*
      Legacy code
      console.log('El rol es ', this.authService.getItemToken('role'));
      if (this.authService.getItemToken('role')) {
        this.router.navigateByUrl('/home');
      } else {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login');
      }
      */
    } else {
      localStorage.removeItem('user');
      return true;
    }
  }
}
