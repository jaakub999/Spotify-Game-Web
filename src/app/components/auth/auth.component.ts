import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { LoginResponse } from "../../models/login-response";
import { RouteUrl } from "../../shared/route-url";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSignIn() {
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    if (username && password) {
      const encodedPassword = encodeURIComponent(password);
      this.authService.logIn(username, encodedPassword).subscribe(
        (response: LoginResponse) => {
          this.authService.setToken(response.token);
          this.router.navigateByUrl(RouteUrl.HOME);
        });
    }
  }

  onRegister() {
    this.router.navigateByUrl(RouteUrl.REGISTER);
  }

  onPasswordChange() {
    this.router.navigateByUrl(RouteUrl.PASSWORD);
  }
}
