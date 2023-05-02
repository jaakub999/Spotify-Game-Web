import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { ChangePasswordRequest } from "../models/change-password-request";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  register(username: string, password: string, email: string): Observable<User> {
    const user = {
      username,
      password,
      email,
      verified: false,
      sessionId: 0
    };
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

  changePassword(request: ChangePasswordRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/change-password`, request);
  }
}
