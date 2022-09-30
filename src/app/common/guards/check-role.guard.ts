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
      this.router.navigate(['/login']);
      return false;
    }
    if (this.authService.getItemToken('role')) {
      return true;
    } else {
      return false;
    }
  }
}
