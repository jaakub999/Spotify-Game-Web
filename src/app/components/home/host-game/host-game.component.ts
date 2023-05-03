import { Component, Input } from '@angular/core';
import { Session } from "../../../models/session";

@Component({
  selector: 'app-host-game',
  templateUrl: './host-game.component.html'
})
export class HostGameComponent {

  @Input() show!: boolean;
  @Input() session!: Session;
}
