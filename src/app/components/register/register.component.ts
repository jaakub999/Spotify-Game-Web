import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {RouteUrl} from "../../shared/route-url";
import {Email} from "../../shared/email";
import {EmailType} from "../../shared/email-type";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  email!: Email;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.email = {
      address: '',
      type: EmailType.REGISTER,
      show: false
    };
  }

  onSubmit() {
    const emailAddress = this.form.get('email')?.value;
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;

    if (emailAddress && username && password && confirmPassword) {
      if (password !== confirmPassword) {
        window.alert('Passwords do not match')
        return;
      } else {
        this.userService.register(username, password, emailAddress).subscribe(
          () => {
            this.email.address = emailAddress;
            this.email.show = true;
          });
      }
    }
  }

  cancel() {
    this.router.navigateByUrl(RouteUrl.AUTH)
  }
}
