import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginResponse } from "../models/login-response";
import { API_BASE_URL, JWT_TOKEN_KEY } from "../config/constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = `${API_BASE_URL}/login`;

  constructor(private http: HttpClient) {}

  logIn(username: string, password: string): Observable<LoginResponse> {
    const request = {
      username,
      password
    };
    return this.http.post<LoginResponse>(this.baseUrl, request);
  }

  logOut() {
    localStorage.removeItem(JWT_TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    return !this.isTokenExpired(token) && !!token;
  }

  setToken(token: string) {
    localStorage.setItem(JWT_TOKEN_KEY, token);
  }

  private isTokenExpired(token: string | null): boolean {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
    }
    return true;
  }
}
