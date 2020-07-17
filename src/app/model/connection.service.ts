import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

// this service presets the connection status to the rest of the application
// obtaining the status through the browser's navigator.onLine property
// responding to the online and offline events, which are triggered when the connection state changes
@Injectable()
export class ConnectionService {

  private connEvents: Subject<boolean>;

  constructor() {
    this.connEvents = new Subject<boolean>();
    window.addEventListener("online", (e) => this.handleConnectionChange(e));
    window.addEventListener("offline", (e) => this.handleConnectionChange(e));
  }

  private handleConnectionChange(event) {
    this.connEvents.next(this.connected);
  }

  get connected(): boolean {
    return window.navigator.onLine;
  }

  get Changes(): Observable<boolean> {
    return this.connEvents;
  }

}