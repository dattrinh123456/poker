import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { avatars } from 'src/assets/common/utils';
import { LoginPageService } from './login-page.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  username: string = '';
  images = avatars;
  avatar: string = '';
  password: string = '';
  confirmPassword: string = '';
  isUserExisted = false;
  usernames: Array<string> = [];

  constructor(private router: Router, private loginService: LoginPageService) {}

  ngOnInit(): void {
    this.loginService.getAllUsers().subscribe((res: any) => {
      this.usernames = res.map((x: any) => x.name);
    });
  }

  join() {
    this.loginService
      .createUser({
        name: this.username,
        avatar: this.avatar,
        password: this.password,
        rooms: [],
      })
      .subscribe((res: any) => {
        this.loginService.setUser(res);
        localStorage.setItem(
          'user',
          JSON.stringify({ name: res.name, id: res.id })
        );
      });
    this.router.navigateByUrl('/home');
  }

  choseAvatar(avatar: string) {
    this.avatar = avatar;
  }
}
