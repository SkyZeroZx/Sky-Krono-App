import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Type, Response } from '../../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  constructor(private http: HttpClient) {}

  getAllTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${environment.API_URL}/type`);
  }

  createType(createType: Type): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/type`, createType);
  }

  updateType(updateType: Type): Observable<Response> {
    return this.http.patch<Response>(`${environment.API_URL}/type`, updateType);
  }

  deleteType(codType: number): Observable<Response> {
    return this.http.delete<Response>(`${environment.API_URL}/type/${codType}`);
  }
}
