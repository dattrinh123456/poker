import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginPageService } from './login-page/login-page.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private loginService: LoginPageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | boolean {
    let user: any = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.name && !state.url.includes('login')) {
      this.router.navigate(['/login']);
      return false;
    }
    if (!user?.name && state.url.includes('login')) {
      return true;
    }

    return this.loginService.getInfomationUser(user.id).pipe(
      map((res: any) => {
        this.loginService.setUser(res);
        if (res?.name && state.url.includes('login')) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }
}
