import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class AppService {
  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io(environment.serverURL);
  }

  start(payload: object) {
    this.socket.emit('start', payload);
  }

  joinRoom(id: string) {
    this.socket.emit('joinroom', id);
  }

  leftRoom(id: string) {
    this.socket.emit('leftroom', id);
  }

  nextMove(type: any, payload: any) {
    this.socket.emit('nextround', { type, payload });
  }

  onNewMessage() {
    return new Observable((observer) => {
      this.socket.on('message', (msg) => {
        observer.next(msg);
      });
    });
  }

  fetchRooms() {
    this.socket.emit('fecthRoom');
  }
}
