import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { SessionService } from "../../services/session.service";
import { Session } from "../../models/session";
import { SpotifyPlaylist } from "../../models/spotify-playlist";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showHost = false;
  chosenPlaylist!: SpotifyPlaylist;
  session!: Session;
  code!: string

  constructor(
    private authService: AuthService,
    private sessionService: SessionService
  ) {}

  hostGame() {
    this.sessionService.createSession().subscribe(
      (session: Session) => {
        this.session = session;
        this.code = session.code
        this.showHost = true;
      });
  }

  onLogOutClick() {
    this.authService.logOut();
  }

  handleEvent(event: any) {
    this.chosenPlaylist = event;
  }
}
