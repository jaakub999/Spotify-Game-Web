import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import { catchError} from "rxjs";
import { EmailType } from "../../shared/email-type";
import { Email } from "../../shared/email";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  @Input() email!: Email

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  resendEmail() {
    if (this.email.type === EmailType.REGISTER) {
      this.userService.resendVerificationEmail(this.email.address).pipe(
        catchError((error): any => {
          window.alert('An unexpected error occurred');
          return;
        })
      ).subscribe(() => {
        window.confirm('Email has been resent');
      });
    }
  }
}
