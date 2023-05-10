import { Component, Input } from '@angular/core';
import { SpotifyPlaylist } from "../../../models/spotify-playlist";
import { SpotifyService } from "../../../services/spotify.service";
import {SessionService} from "../../../services/session.service";

@Component({
  selector: 'app-host-game',
  templateUrl: './host.component.html'
})
export class HostComponent {

  @Input() show!: boolean;
  @Input() code!: string;
  @Input() playlist!: SpotifyPlaylist;

  constructor(
    private spotifyService: SpotifyService,
    private sessionService: SessionService
  ) {}


  start() {

  }
}
