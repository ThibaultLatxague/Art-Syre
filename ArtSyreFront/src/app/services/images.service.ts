import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = `${environment.apiUrl}/images`;

  constructor(private http: HttpClient) { }

  getImages(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getImage(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createImage(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateImage(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteImage(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
