import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginPageService {
  user$ = new BehaviorSubject<any>({});
  userURL = environment.serverURL;
  constructor(private http: HttpClient) {}

  getInfomationUser(id: string): Observable<any> {
    return this.http
      .get(this.userURL + '/get/users/' + id)
      .pipe(map((res: any) => res[0]));
  }

  setUser(user: any): void {
    this.user$.next(user);
  }

  getUser(): Observable<any> {
    return this.user$.asObservable();
  }

  createUser(user: object): Observable<any> {
    return this.http.post(this.userURL + '/post/users', user);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.userURL + '/get/users');
  }

  updateUser(id: string, payload: any): Observable<any> {
    return this.http.post(this.userURL + '/update/users/' + id, payload);
  }
}
