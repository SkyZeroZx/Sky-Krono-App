import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserUpdate, User, Response } from '../../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL}/users`);
  }

  createUser(user: UserUpdate): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/users`, user);
  }

  updateUser(user: UserUpdate): Observable<Response> {
    return this.http.patch<Response>(`${environment.API_URL}/users`, user);
  }

  deleteUser(id: number): Observable<Response> {
    return this.http.delete<Response>(`${environment.API_URL}/users/${id}`);
  }

  resetUserPassword(username: string): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/auth/reset-password`, {
      username: username,
    });
  }

  saveUserNotification(token: PushSubscription): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/notificacion`, {
      tokenPush: JSON.stringify(token),
    });
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/users/profile`);
  }

  sendNotification(users: User[]): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/notificacion/send`, {
      users: users,
    });
  }

  uploadPhoto(file): Observable<Response> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<Response>(`${environment.API_URL}/users/photo`, formData);
  }
}
