import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {
  AttendanceHistoryUser,
  Attendance,
  Response,
  ReportAttendance,
  SearchReportAttendance,
} from '../../common/interfaces';

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

  getAttendanceReport(
    searchReportAttendance: SearchReportAttendance,
  ): Observable<ReportAttendance[]> {
    return this.http.post<ReportAttendance[]>(
      `${environment.API_URL}/attendance/report`,
      searchReportAttendance,
    );
  }
}
