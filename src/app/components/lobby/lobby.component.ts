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
    this.stompSubscribe();
  }

  ngOnDestroy() {
    this.stompUnsubscribe();
  }

  choosePlaylist(event: SpotifyPlaylist) {
    this.chosenPlaylist = event;
  }

  goBack() {
    this.router.navigateByUrl(RouteUrl.HOME);
  }

  getNumberOfTracksAndStart(event: number) {
    this.startGame(event);
  }

  private stompSubscribe() {
    this.webSocketService.subscribe('/topic/session/join/' + this.code,
      () => {
      this.refreshPlayerTable();
    });
    this.webSocketService.subscribe('/topic/session/start/' + this.code,
      () => {
      this.router.navigate([`${RouteUrl.GAME}/${this.code}`])
    });
  }

  private stompUnsubscribe() {
    this.webSocketService.unsubscribe('/topic/session/join/' + this.code);
    this.webSocketService.unsubscribe('/topic/session/start/' + this.code);
    //this.webSocketService.unsubscribe('/topic/session/delete/' + this.code);
  }

  private refreshPlayerTable() {
    this.sessionService.getSession(this.code).subscribe(
      (response: SessionResponse) => {
        this.session = response.session;
        this.isHost = this.session.host === response.username;
    });
  }

  private startGame(numberOfTracks: number) {
    this.sessionService.updateSessionData(
      this.session.code,
      this.chosenPlaylist.id,
      numberOfTracks
    ).subscribe(() => {});
  }
}
