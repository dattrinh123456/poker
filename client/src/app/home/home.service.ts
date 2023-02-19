import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor(private http: HttpClient) {}

  createRoom(payload: object): Observable<any> {
    return this.http.post(environment.pokerURL + 'room', payload);
  }

  getAllRooms(): Observable<any> {
    return this.http.get(environment.pokerURL + 'room');
  }

  deleteRoom(id: any): Observable<any> {
    return this.http.delete(environment.pokerURL + `room/${id}`);
  }

  updateRoom(id: string, payload: any): Observable<any> {
    return this.http.put(environment.pokerURL + 'room/' + id, payload);
  }

  getSingleRoom(id: string): Observable<any> {
    return this.http.get(environment.pokerURL + 'room/' + id);
  }
}
