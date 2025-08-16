import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  private apiUrl = `${environment.apiUrl}/utilisateurs`;

  constructor(private http: HttpClient) { }

  getUtilisateurs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUtilisateur(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createUtilisateur(data: Utilisateur): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateUtilisateur(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteUtilisateur(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
