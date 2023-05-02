import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { RouteUrl } from "../../shared/route-url";
import { EmailType } from "../../shared/email-type";
import { catchError } from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  emailAddress!: string;
  showEmail = false;
  emailType = EmailType.REGISTER;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.form = this.buildFormGroup();
  }

  onSubmit() {
    const email = this.form.get('email');
    const username = this.form.get('username');
    const password = this.form.get('password');
    const confirmPassword = this.form.get('confirmPassword');

    if (email && username && password && confirmPassword) {
      if (password.value !== confirmPassword.value) {
        window.alert('Passwords do not match')
        return;
      } else {
        this.emailAddress = email.value;
        this.userService.register(username.value, password.value, email.value).pipe(
          catchError((error): any => {
            window.alert('An unexpected error occurred');
            return;
          })
        ).subscribe(() => {
          this.showEmail = true;
        });
      }
    }
  }

  cancel() {
    this.router.navigateByUrl(RouteUrl.AUTH)
  }

  private buildFormGroup(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
}
