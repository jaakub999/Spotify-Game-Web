import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from "./services/web-socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.connect();
  }

  ngOnDestroy() {
    this.webSocketService.disconnect();
  }
}
