import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  PublicKeyCredentialCreationOptionsJSON,
  RegistrationCredentialJSON,
} from '@simplewebauthn/typescript-types';
import {
  ChangePassword,
  UserLogin,
  UserLoginResponse,
  Response,
} from '@core/interfaces';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<UserLoginResponse>(null);

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  get user$(): Observable<UserLoginResponse> {
    return this.user.asObservable();
  }

  get userValue(): UserLoginResponse {
    return this.user.getValue();
  }

  login(userLogin: UserLogin): Observable<UserLoginResponse> {
    return this.http
      .post<UserLoginResponse>(`${environment.API_URL}/auth/login`, userLogin)
      .pipe(
        map((user: UserLoginResponse) => {
          this.saveLocalStorage(user);
          this.user.next(user);
          return user;
        }),
      );
  }

  changePassword(changePassword: ChangePassword): Observable<Response> {
    return this.http.post<Response>(
      `${environment.API_URL}/auth/change-password`,
      changePassword,
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.user.next(null);
    this.loggedIn.next(false);
  }

  getItemToken(item: string) {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    if (user) {
      return helper.decodeToken(JSON.parse(localStorage.getItem('user')).token)[item];
    } else {
      this.user.next(user);
      return null;
    }
  }

  private checkToken(): void {
    if (localStorage.getItem('user') == 'undefined') {
      this.logout();
      return;
    }

    const user = JSON.parse(localStorage.getItem('user')) || null || undefined;

    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        this.logout();
      } else {
        this.user.next(user);
      }
    }
  }

  private saveLocalStorage(user: UserLoginResponse): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getRegistrationAuthnWeb(): Observable<PublicKeyCredentialCreationOptionsJSON> {
    return this.http.get<PublicKeyCredentialCreationOptionsJSON>(
      `${environment.API_URL}/auth/generate-registration-options`,
    );
  }

  verifyRegistration(registrationCredentialJSON: RegistrationCredentialJSON) {
    return this.http.post<any>(
      `${environment.API_URL}/auth/verify-registration`,
      registrationCredentialJSON,
    );
  }

  startAuthentication(username: string) {
    return this.http.post<any>(
      `${environment.API_URL}/auth/generate-authentication-options`,
      {
        username,
      },
    );
  }

  verifityAuthentication(data) {
    return this.http
      .post<any>(`${environment.API_URL}/auth/verify-authentication`, data)
      .pipe(
        map((user) => {
          this.saveLocalStorage(user.data);
          this.user.next(user.data);
          return user;
        }),
      );
  }
}
