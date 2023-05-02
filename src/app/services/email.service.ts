import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private readonly baseUrl = 'http://localhost:8080/api/email';

  constructor(private http: HttpClient) {}

  resendRegisterEmail(email: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/resend-register-email?email=${email}`, {});
  }

  sendPasswordEmail(email: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/send-password-email?email=${email}`, {});
  }
}
