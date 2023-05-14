import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpotifyPlaylist } from "../../models/spotify-playlist";
import { Session } from "../../models/session";
import { WebSocketService } from "../../services/web-socket.service";
import { SessionService } from "../../services/session.service";
import { RouteUrl } from "../../shared/route-url";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionResponse } from "../../models/session-response";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, OnDestroy {

  chosenPlaylist!: SpotifyPlaylist;
  session!: Session;
  code!: string;
  isHost!: boolean;

  constructor(
    private sessionService: SessionService,
    private webSocketService: WebSocketService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get('code')!;
    this.refreshPlayerTable();
    this.subscribeToSessionUpdates();
  }

  ngOnDestroy() {
    this.webSocketService.unsubscribe();
  }

  choosePlaylist(event: SpotifyPlaylist) {
    this.chosenPlaylist = event;
  }

  startGame(event: number) {
    this.sessionService.updateSessionData(
      this.session.code,
      this.chosenPlaylist.id,
      event
    ).subscribe();
  }

  goBack() {
    this.router.navigateByUrl(RouteUrl.HOME);
  }

  private subscribeToSessionUpdates() {
    this.webSocketService.subscribe('/topic/session/join/' + this.code,
      () => {
        this.refreshPlayerTable();
      });
    this.webSocketService.subscribe('/topic/session/update/' + this.code,
      () => {

      });
    this.webSocketService.subscribe('/topic/session/delete/' + this.code,
      () => {
      window.alert("Session is no longer available");
      this.goBack();
      });
  }

  private refreshPlayerTable() {
    this.sessionService.getSession(this.code).subscribe(
      (data: SessionResponse) => {
        this.session = data.session;
        this.isHost = this.session.host === data.username;
    });
  }
}
