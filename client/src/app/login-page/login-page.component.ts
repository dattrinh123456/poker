import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { avatars, unsubscribe } from 'src/assets/common/utils';
import { LoginPageService } from './login-page.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  username: string = '';
  images = avatars;
  avatar: string = '';
  password: string = '';
  confirmPassword: string = '';
  isUserExisted = false;
  usernames: Array<string> = [];
  isSignin = true;
  isWrongAccount = false;
  users = [];
  notifier: Subject<any> = new Subject();
  constructor(private router: Router, private loginService: LoginPageService) {}

  ngOnInit(): void {
    this.loginService
      .getAllUsers()
      .pipe(takeUntil(this.notifier))
      .subscribe((res: any) => {
        this.users = res;
        this.usernames = res.map((x: any) => x.name);
      });
  }
  ngOnDestroy(): void {
    unsubscribe(this.notifier);
  }

  join(type: any) {
    if (type == 'login') {
      let user = this.users.find(
        (x: any) => x.name == this.username && x.password == this.password
      );
      if (user) {
        this.configUser(user);
        this.isWrongAccount = false;
      } else this.isWrongAccount = true;
    } else {
      this.loginService
        .createUser({
          name: this.username,
          avatar: this.avatar,
          password: this.password,
          rooms: JSON.stringify([]),
        })
        .subscribe((res: any) => {
          this.configUser(res);
        });
    }
  }

  choseAvatar(avatar: string) {
    this.avatar = avatar;
  }

  configUser(res: any) {
    this.loginService.setUser(res);
    localStorage.setItem(
      'user',
      JSON.stringify({ name: res.name, id: res.id, avatar: res.avatar })
    );
    this.router.navigateByUrl('/home');
  }
}
