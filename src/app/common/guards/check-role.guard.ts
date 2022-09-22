import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckRole implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate() {
    console.log('Check Role');
    console.log(window.location.href);
    if (JSON.parse(localStorage.getItem('user')) == null) {
      console.log('Deslogeo Entor aca?')
      this.router.navigate(['/login']);
      return false;
    }
    switch (this.authService.getItemToken('role')) {
      case 'admin':
        console.log('Role ', this.authService.getItemToken('role'));
        if (window.location.href.includes('calendar-view')) {
          return false;
        } else {
          return true;
        }
      case 'viewer':
        console.log('Role ', this.authService.getItemToken('role'));
        if (
          window.location.href.includes('calendar-admin') ||
          window.location.href.includes('users')
        ) {
          console.log('Aca entonces?')
          return false;
        } else {
          return true;
        }
      default:
        return false;
    }
  }
}
