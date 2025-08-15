import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableauxService {

  private apiUrl = `${environment.apiUrl}/tableaux`;

  constructor(private http: HttpClient) { }

  getTableaux(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getTableau(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createTableau(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateTableau(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteTableau(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
