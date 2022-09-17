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
      if (helper.decodeToken(JSON.parse(localStorage.getItem('user')).token.firstLogin)) {
        localStorage.removeItem("user");
        return true;
      }
      console.log('El rol es ', this.authService.getItemToken('role'));
      switch (this.authService.getItemToken('role')) {
        case 'admin':
          this.router.navigateByUrl('/calendar-admin');
          break;
        case 'viewer':
          this.router.navigateByUrl('/calendar-view');
          break;
        default :
        localStorage.removeItem("user");
        this.router.navigateByUrl('/login');
        break;
      }
    } else {
      localStorage.removeItem("user");
      return true;
    }
 
  }
}
