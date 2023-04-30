import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginResponse } from "../models/login-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = 'http://localhost:8080/api/login';
  private readonly tokenKey = 'auth_token_key';

  constructor(private http: HttpClient) {}

  logIn(username: string, password: string): Observable<LoginResponse> {
    const request = {
      username: username,
      password: password
    };
    return this.http.post<LoginResponse>(this.baseUrl, request);
  }

  logOut() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !this.isTokenExpired(token) && !!token;
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  private isTokenExpired(token: string | null): boolean {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
    }
    return true;
  }
}
