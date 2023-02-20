import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageService } from './login-page/login-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user:any ;

  constructor(private router: Router, private loginService: LoginPageService) {
    this.loginService.getUser().subscribe(res=>{
      this.user = res
    })
  }

  ngOnInit(): void {
  }

  backToHome() {
    this.router.navigateByUrl('home')
  }
}
