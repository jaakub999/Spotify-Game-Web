import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { EmailType } from "../../shared/email-type";
import {Email} from "../../shared/email";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  form!: FormGroup;
  email!: Email;

  ngOnInit() {
  }
}
