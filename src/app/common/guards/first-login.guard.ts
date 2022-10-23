import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FirstLogin implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}
  // Validamos si es primer login del usuario , si es primer login lo mandamos a cambiar contraseña
  canActivate() {
    console.log('Guard First Login');
    if (JSON.parse(localStorage.getItem('user')) == null) {
      return false;
    }
    if (this.auth.getItemToken('firstLogin')) {
      this.router.navigate(['/change-password']);
      return false;
    } else {
      return true;
    }
  }
}
