import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    this.socket.emit('joimroom',id)
  }
  // // EMITTER
  // sendMessage(msg: string) {
  //   this.socket.emit('sendMessage', { message: msg });
  // }

  // // HANDLER
  // onNewMessage() {
  //   return new Observable((observer) => {
  //     this.socket.on('newMessage', (msg) => {
  //       observer.next(msg);
  //     });
  //   });
  // }
}
