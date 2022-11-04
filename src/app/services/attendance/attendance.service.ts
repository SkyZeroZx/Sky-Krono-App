import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import {
  AttendanceHistoryUser,
  Attendance,
  Response,
  ReportAttendance,
  SearchReportAttendance,
  ChartsReport,
  ListChartReport,
  SearchChartReport,
} from '@core/interfaces';
import { formatedDataCharts } from '@core/helpers/helper';

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

  getChartsAttendance(searchChartReport: SearchChartReport): Observable<ListChartReport> {
    return this.http
      .post<ChartsReport[]>(`${environment.API_URL}/attendance/chart`, searchChartReport)
      .pipe(
        map((res) => {
          return formatedDataCharts(res);
        }),
      );
  }

  getChartsAttendanceByUser(
    searchChartReport: SearchChartReport,
  ): Observable<ListChartReport> {
    return this.http
      .post<ChartsReport[]>(
        `${environment.API_URL}/attendance/chart-user`,
        searchChartReport,
      )
      .pipe(
        map((res) => {
          return formatedDataCharts(res);
        }),
      );
  }
}
