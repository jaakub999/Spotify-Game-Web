import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { SessionService } from "../../services/session.service";
import { Session } from "../../models/session";
import { SpotifyPlaylist } from "../../models/spotify-playlist";
import { WebSocketSubject } from "rxjs/internal/observable/dom/WebSocketSubject";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  showHost = false;
  showCode = false;
  showLobby = false;
  chosenPlaylist!: SpotifyPlaylist;
  session!: Session;

  private socket$!: WebSocketSubject<Session>;

  constructor(
    private authService: AuthService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.socket$ = new WebSocketSubject('ws://localhost:8080/ws');
    this.socket$.subscribe(
      (message: any) => {
        if (message.topic === '/topic/session') {
          this.session = JSON.parse(message.body);
        }
      });
  }

  ngOnDestroy() {
    this.socket$.complete();
  }

  hostGame() {
    this.sessionService.createSession().subscribe(
      (session: Session) => {
        this.session = session;
        this.showHost = true;
      });
  }

  joinGame(event: any) {
    this.sessionService.joinSession(event).subscribe(
      () => {
        this.showLobby = true;
        this.showCode = false;
      });
  }

  choosePlaylist(event: any) {
    this.chosenPlaylist = event;
  }

  onLogOutClick() {
    this.authService.logOut();
  }
}
