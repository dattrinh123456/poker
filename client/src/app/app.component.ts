import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { LoginPageService } from './login-page/login-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: any;
  items: MenuItem[] = [];
  constructor(
    private router: Router,
    private loginService: LoginPageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loginService.getUser().subscribe((res) => {
      this.user = res;
      this.items = [{ label: res.name }, { label: 'logout' }];
    });
  }

  backToHome() {
    this.router.navigateByUrl('home');
  }

  logout() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        //Actual logic to perform a confirmation
        localStorage.removeItem('user')
        this.router.navigateByUrl('login')
      },
    });
  }
}
