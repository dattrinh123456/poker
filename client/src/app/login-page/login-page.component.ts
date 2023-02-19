import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  username: string = '';
  constructor(private router: Router) {}
  join() {
    localStorage.setItem('username', this.username);
    localStorage.setItem('id', Date.now().toString());
    this.router.navigateByUrl('/home');
  }
}
