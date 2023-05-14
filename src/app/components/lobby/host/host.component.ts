import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpotifyPlaylist } from "../../../models/spotify-playlist";

@Component({
  selector: 'app-host-game',
  templateUrl: './host.component.html'
})
export class HostComponent {

  @Input() code!: string;
  @Input() playlist!: SpotifyPlaylist;
  @Output() event: EventEmitter<number> = new EventEmitter<number>();

  selectedValue = 3;

  increaseValue() {
    if (this.selectedValue < 15) {
      this.selectedValue++;
    }
  }

  decreaseValue() {
    if (this.selectedValue > 3) {
      this.selectedValue--;
    }
  }

  start() {
    this.event.emit(this.selectedValue);
  }
}
