import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { avatars } from 'src/assets/common/utils';
import { LoginPageService } from './login-page.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  username: string = '';
  images = avatars;
  avatar: string = '';
  constructor(private router: Router, private loginService: LoginPageService) {}
  join() {
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: this.username,
        avatar: this.avatar,
        id: Date.now().toString(),
      })
    );
    this.loginService.setUser();
    this.router.navigateByUrl('/home');
  }

  choseAvatar(avatar: string) {
    this.avatar = avatar;
  }
}
