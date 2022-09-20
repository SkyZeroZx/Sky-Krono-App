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

  resetUserPassword(username : string): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/auth/reset-password`, {
      username: username,
    });
  }

  updateUser(user: UserUpdate): Observable<Response> {
    return this.http.patch<Response>(`${environment.API_URL}/users`, user);
  }

  deleteUser(id: number): Observable<Response> {
    return this.http.delete<Response>(`${environment.API_URL}/users/${id}`);
  }

  createUser(user: UserUpdate): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/users`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL}/users`);
  }

  saveUserNotification(token: PushSubscription): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/notificacion`, {
      tokenPush: JSON.stringify(token),
    });
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/users/profile`);
  }

  sendNotification(users : User[]): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/notificacion/send`, { users: users });
  }
}
