import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { RouteUrl } from "../../shared/route-url";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form!: FormGroup;
  token!: string;
  changed = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token')!;
    this.form = this.buildFormGroup();
  }

  onSubmit() {
    const newPassword = this.form.get('password');
    const confirmNewPassword= this.form.get('confirmPassword');

    if (newPassword && confirmNewPassword) {
      const request = {
        token: this.token,
        newPassword: newPassword.value,
        confirmNewPassword: confirmNewPassword.value
      }

      this.userService.changeForgottenPassword(request).subscribe(
        () => {
          this.changed = true;
          setTimeout(() => {
            this.cancel();
          }, 5000);
        });
    }
  }

  cancel() {
    this.router.navigateByUrl(RouteUrl.AUTH)
  }

  private buildFormGroup(): FormGroup {
    return this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
}
