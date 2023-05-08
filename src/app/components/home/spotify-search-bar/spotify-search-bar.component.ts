import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpotifyPlaylist } from "../../../models/spotify-playlist";
import { SpotifyService } from "../../../services/spotify.service";

@Component({
  selector: 'app-spotify-search-bar',
  templateUrl: './spotify-search-bar.component.html'
})
export class SpotifySearchBarComponent {

  @Input() show!: boolean;
  @Output() event: EventEmitter<SpotifyPlaylist> = new EventEmitter<SpotifyPlaylist>();

  searchQuery: string = '';
  status: string = 'Playlists will be displayed here';
  playlists: SpotifyPlaylist[] = [];

  constructor(private spotifyService: SpotifyService) {}

  search() {
    if (this.searchQuery) {
      this.status = "Searching..."
      this.playlists = [];
      this.spotifyService.searchPlaylists(this.searchQuery).subscribe(
        (data: SpotifyPlaylist[]) => {
          if (data.length === 0) {
            this.status = "Nothing was found :("
          } else {
            this.playlists = data;
          }
        });
    }
  }

  onItemClickEvent(playlist: SpotifyPlaylist) {
    this.event.emit(playlist);
  }
}
