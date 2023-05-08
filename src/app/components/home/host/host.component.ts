import { Component, Input } from '@angular/core';
import { Session } from "../../../models/session";

@Component({
  selector: 'app-host-game',
  templateUrl: './host.component.html'
})
export class HostComponent {

  @Input() show!: boolean;
  @Input() session!: Session;

  start() {
    
  }
}
