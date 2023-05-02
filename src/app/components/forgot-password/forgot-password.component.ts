import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmailType } from "../../shared/email-type";
import { Router } from "@angular/router";
import { RouteUrl } from "../../shared/route-url";
import { EmailService } from "../../services/email.service";
import { catchError } from "rxjs";

@Component({
  selector: 'app-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form!: FormGroup;
  emailAddress!: string;
  showEmail = false;
  emailType = EmailType.PASSWORD;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private emailService: EmailService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    const email = this.form.get('email');

    if (email) {
      this.emailAddress = email.value;
      this.emailService.sendPasswordEmail(email.value).pipe(
        catchError((error): any => {
          window.alert('An unexpected error occurred');
          return
        })
      ).subscribe(() => {
        this.showEmail = true;
      });
    }
  }

  cancel() {
    this.router.navigateByUrl(RouteUrl.AUTH)
  }
}
