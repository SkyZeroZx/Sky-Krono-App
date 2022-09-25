import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../../common/interfaces/response';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AttendanceHistoryUser, Attendance } from '../../common/interfaces/attendance';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private http: HttpClient) {}

  getAttendanceByUser(): Observable<Attendance> {
    return this.http.get<Attendance>(`${environment.API_URL}/attendance`);
  }

  getHistoryAttendanceUser(): Observable<AttendanceHistoryUser> {
    return this.http.get<AttendanceHistoryUser>(
      `${environment.API_URL}/attendance/history`,
    );
  }

  registerEntryAttendance(description: string): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/attendance`, {
      description: description,
    });
  }

  registerExitAttendance(): Observable<Response> {
    return this.http.patch<Response>(`${environment.API_URL}/attendance`, null);
  }
}
