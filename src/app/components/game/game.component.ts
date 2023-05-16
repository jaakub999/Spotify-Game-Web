import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SessionService } from "../../services/session.service";
import { TrackGroup } from "../../models/track-group";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  spotifyPlayer!: Spotify.Player
  trackGroups!: TrackGroup[];

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getTrackGroups();
    const playerInit: Spotify.PlayerInit = {
      name: 'Spotify Player',
      getOAuthToken(cb: (token: string) => void) {

      }
    }
  }

  private getTrackGroups() {
    const code = this.route.snapshot.paramMap.get('code')!;
    this.sessionService.getSessionTracks(code).subscribe(
      (data: TrackGroup[]) => {
        this.trackGroups = data;
      });
  }
}
