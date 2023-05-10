import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JWT_TOKEN_KEY } from "../shared/jwt-token-key";
import { Observable } from "rxjs";
import { Session } from "../models/session";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly baseUrl = 'http://localhost:8080/api/session';

  constructor(private http: HttpClient) {}

  createSession(): Observable<Session> {
    const token = localStorage.getItem(JWT_TOKEN_KEY)!;
    const headers = new HttpHeaders().set('Authentication', token);
    return this.http.post<Session>(`${this.baseUrl}/create`, {}, { headers })
  }

  joinSession(code: string): Observable<any> {
    const token = localStorage.getItem(JWT_TOKEN_KEY)!;
    const headers = new HttpHeaders().set('Authentication', token);
    return this.http.post(`${this.baseUrl}/join?code=${code}`, {}, { headers });
  }
}
