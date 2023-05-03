import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { SessionService } from "../../services/session.service";
import { Session } from "../../models/session";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showHost = false;
  session!: Session;

  constructor(
    private authService: AuthService,
    private sessionService: SessionService
  ) {}

  hostGame() {
    this.sessionService.createSession().subscribe(
      (session: Session) => {
        this.session = session;
        this.showHost = true;
      });
  }

  onLogOutClick() {
    this.authService.logOut();
  }
}
