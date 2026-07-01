import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}/mail`;

  sendMail(formData: any): Promise<any> {
    return this.http.post(`${this.apiUrl}/send`, formData).toPromise();
  }
}
