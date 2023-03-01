import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class HomeService {
  roomURL = environment.serverURL;

  constructor(private http: HttpClient) {}

  createRoom(payload: object): Observable<any> {
    return this.http.post(this.roomURL + '/post/rooms', payload);
  }

  getAllRooms(): Observable<any> {
    return this.http.get(this.roomURL + '/get/rooms');
  }

  deleteRoom(id: any): Observable<any> {
    return this.http.delete(this.roomURL + '/delete/rooms/' + id);
  }

  updateRoom(id: string, payload: any): Observable<any> {
    return this.http.post(this.roomURL + '/update/rooms/' + id, payload);
  }

  getSingleRoom(id: string): Observable<any> {
    return this.http
      .get(this.roomURL + '/get/rooms/' + id)
      .pipe(map((res:any) => res[0]));
  }
}
