import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Response, Licence } from '../../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LicenceService {
  constructor(private http: HttpClient) {}

  getAllLicence(): Observable<Licence[]> {
    return this.http.get<Licence[]>(`${environment.API_URL}/licence`);
  }

  getLicencesByUser(): Observable<Licence[]> {
    return this.http.get<Licence[]>(`${environment.API_URL}/licence`);
  }

  createLicence(createLincence: Licence): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/licence`, createLincence);
  }

  updateLicence(updateLincence: Licence): Observable<Response> {
    return this.http.patch<Response>(`${environment.API_URL}/licence`, updateLincence);
  }

  deleteLicence(id: number): Observable<Response> {
    return this.http.delete<Response>(`${environment.API_URL}/licence/${id}`);
  }
}
