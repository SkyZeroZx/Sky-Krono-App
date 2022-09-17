import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserUpdate, User } from 'src/app/common/interfaces/user';
import { environment } from 'src/environments/environment';
import { Response } from '../../common/interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  resetPassword(username): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/auth/reset-password`, username);
  }

  updateUser(user: UserUpdate): Observable<Response> {
    return this.http.patch<Response>(`${environment.API_URL}/users`, user);
  }

  deleteUser(id): Observable<Response> {
    return this.http.delete<Response>(`${environment.API_URL}/users/${id}`);
  }

  createUser(user: UserUpdate): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/users`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL}/users`);
  }

  saveUserNotification(data): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/notificacion`, data);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/users/profile`);
  }

  sendNotification(token): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/notificacion/send`, token);
  }
}
