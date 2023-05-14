import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { SessionService } from "../../services/session.service";
import { Session } from "../../models/session";
import { Router } from "@angular/router";
import { RouteUrl } from "../../shared/route-url";
import { WebSocketService } from "../../services/web-socket.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showCode = false;

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private webSocketService: WebSocketService,
    private router: Router
  ) {}

  hostGame() {
    this.sessionService.createSession().subscribe(
      (data: Session) => {
        this.navigateToSession(data.code);
      });
  }

  insertCode() {
    this.showCode = true;
  }

  joinGame(event: string) {
    this.sessionService.joinSession(event).subscribe(
      () => {
        this.navigateToSession(event);
      });
  }

  private navigateToSession(code: string) {
    this.router.navigate([`${RouteUrl.LOBBY}/${code}`]);
  }
}
