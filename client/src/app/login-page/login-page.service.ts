import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginPageService {
  user$ = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}

  getInfomationUser(id: string) {
    return this.http.get(environment.pokerURL + 'users/' + id);
  }

  setUser(user: any) {
    this.user$.next(user);
  }

  getUser() {
    return this.user$.asObservable();
  }

  createUser(user: object) {
    return this.http.post(environment.pokerURL + 'users', user);
  }

  getAllUsers() {
    return this.http.get(environment.pokerURL + 'users');
  }
}
