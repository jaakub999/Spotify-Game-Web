import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Session } from "../models/session";
import { API_BASE_URL, JWT_TOKEN_KEY } from "../config/constants";
import {SessionResponse} from "../models/session-response";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly baseUrl = `${API_BASE_URL}/session`;

  constructor(private http: HttpClient) {}

  createSession(): Observable<Session> {
    const token = localStorage.getItem(JWT_TOKEN_KEY)!;
    const headers = new HttpHeaders().set('Authentication', token);
    return this.http.post<Session>(`${this.baseUrl}/create`, {}, { headers })
  }

  getSession(code: string): Observable<SessionResponse> {
    const token = localStorage.getItem(JWT_TOKEN_KEY)!;
    const headers = new HttpHeaders().set('Authentication', token);
    return this.http.get<SessionResponse>(`${this.baseUrl}/${code}`, { headers });
  }

  joinSession(code: string): Observable<any> {
    const token = localStorage.getItem(JWT_TOKEN_KEY)!;
    const headers = new HttpHeaders().set('Authentication', token);
    return this.http.post(`${this.baseUrl}/${code}/join`, {},{ headers });
  }

  updateSessionData(session: string, playlist: string, tracks: number): Observable<any> {
    const request = {
      session,
      playlist,
      tracks
    };
    return this.http.post(`${this.baseUrl}/update`, request);
  }

  deleteSession(code: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete?code=${code}`);
  }
}
