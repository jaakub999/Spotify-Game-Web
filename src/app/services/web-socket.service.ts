import { Injectable } from '@angular/core';
import { WS_BASE_URL } from "../config/constants.config";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket$ = new SockJS(WS_BASE_URL);
  stompClient$ = Stomp.over(this.socket$);

  private connecting: boolean = false;
  private topicQueue: any[] = [];

  connect() {
    this.connecting = true;
    this.stompClient$.connect();
    this.connecting = false;
  }

  disconnect() {
    this.connecting = false;
    this.stompClient$.disconnect();
  }

  subscribe(topic: string, callback: any) {
    if (this.connecting) {
      this.topicQueue.push({
        topic,
        callback
      });
      return;
    }

    const connected: boolean = this.stompClient$.connected;
    if (connected) {
      this.connecting = false;
      this.subscribeToTopic(topic, callback);
      return;
    }

    this.connecting = true;
    this.stompClient$.connect({}, (): any => {
      this.subscribeToTopic(topic, callback);

      this.topicQueue.forEach(
        (item: any) => {
        this.subscribeToTopic(item.topic, item.callback)
      });

      this.topicQueue = [];
    });
  }

  unsubscribe(topic: string) {
    const connected: boolean = this.stompClient$.connected;
    if (connected) {
      this.stompClient$.unsubscribe(topic);
    } else {
      this.topicQueue = this.topicQueue.filter(item => item.topic !== topic);
    }
  }

  private subscribeToTopic(topic: string, callback: any) {
    this.stompClient$.subscribe(topic,
      (): any => {
        callback();
      });
  }
}
