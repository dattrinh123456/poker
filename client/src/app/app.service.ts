import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
@Injectable({ providedIn: 'root' })
export class AppService {
  // private socket: Socket;

  // constructor(private http: HttpClient) {
  //   this.socket = io(environment.socketURL);
  // }

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

  // createNewRoom(data: object): Observable<any> {
  //   return this.http.post(
  //     environment.pokerURL + 'room',
  //     addDateToPayload(data)
  //   );
  // }

  // getAllRoom():Observable<any> {
  //   return this.http.get(environment.pokerURL+ 'room')
  // }

  // deleteRoom(id:string):Observable<any> {
  //   return this.http.delete(environment.pokerURL+ `room/${id}`)
  // }
}
