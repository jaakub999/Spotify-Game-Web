import { Component, Input } from '@angular/core';
import { User } from "../../../models/user";

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html'
})
export class PlayerTableComponent {

  @Input() players!: User[];
  @Input() show!: boolean;
}
