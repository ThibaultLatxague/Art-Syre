import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Log } from '../models/log.model';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private apiUrl = `${environment.apiUrl}/logs`;

  constructor(private http: HttpClient) { }

  getLogs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getLogsByCategory(categoryId: number): Observable<Log[]> {
    console.log(`Fetching logs for category ID: ${categoryId}`);
    return this.http.get<Log[]>(`${this.apiUrl}?categories_log_id=${categoryId}`);
  }

  getNumberOfLogs(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}`);
  }

  getLog(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createLog(data: any): Observable<any> {
    console.log("Tentative de création d'un log avec les données suivantes :");
    console.log(data);
    return this.http.post(this.apiUrl, data);
  }

  updateLog(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteLog(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}