import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { unsubscribe } from 'src/assets/common/utils';
import { LoginPageService } from './login-page/login-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  user: any;
  items: MenuItem[] = [];
  notifier = new Subject<any>();
  constructor(
    private router: Router,
    private loginService: LoginPageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loginService
      .getUser()
      .pipe(takeUntil(this.notifier))
      .subscribe((res) => {
        this.user = res;
        this.items = [{ label: res.name }, { label: 'logout' }];
      });
  }

  ngOnDestroy(): void {
    unsubscribe(this.notifier);
  }

  backToHome() {
    this.router.navigateByUrl('home');
  }

  logout() {
    this.confirmationService.confirm({
      accept: () => {
        //Actual logic to perform a confirmation
        localStorage.removeItem('user');
        this.router.navigateByUrl('login');
      },
    });
  }
}
