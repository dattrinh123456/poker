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

  start(id: string) {
    this.socket.emit('start', id)
  }

  joinRoom(id : string) {
    console.log('id',id)
    this.socket.emit('joinroom',id)
  }

  leftRoom(id: string){
    console.log(id)
    this.socket.emit('leftroom',id)
  }

  onNewMessage() {
    return new Observable((observer) => {
      this.socket.on('message', (msg) => {
        console.log(msg)
        observer.next(msg);
      });
    });
  }
}
