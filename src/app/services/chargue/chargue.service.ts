import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chargue, UpdateChargue, Response } from '../../common/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChargueService {
  constructor(private http: HttpClient) {}

  getAllChargue(): Observable<Chargue[]> {
    return this.http.get<Chargue[]>(`${environment.API_URL}/chargue`);
  }

  createChargue(chargue: Chargue): Observable<Response> {
    return this.http.post<Response>(`${environment.API_URL}/chargue`, chargue);
  }

  updateChargue(chargue: UpdateChargue): Observable<Response> {
    return this.http.patch<Response>(`${environment.API_URL}/chargue`, chargue);
  }

  deleteChargue(id: number): Observable<Response> {
    return this.http.delete<Response>(`${environment.API_URL}/chargue/${id}`);
  }
}
