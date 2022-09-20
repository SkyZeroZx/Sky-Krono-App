import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IsLogged implements CanActivate {
  canActivate(): boolean {
    console.log('Auth Guard IsLogin');
    if (localStorage.getItem('user') !== null) {
      return true;
    } else {
      return false;
    }
  }
}
