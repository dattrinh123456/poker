import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService{
  user$ = new BehaviorSubject<any>({});
  user: any = null
  constructor() {
    this.user = this.getInfomationUser()
    this.user$.next(this.user);
  }

  getInfomationUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  setUser(){
    this.user$.next(this.user)
  }

  getUser(){
    return this.user$.asObservable()
  }

}
