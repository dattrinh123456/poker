import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { HomeService } from './home/home.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginPageService } from './login-page/login-page.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginPageService,
    private homeService: HomeService
  ) {}

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

    if (route?.routeConfig?.path == 'room/:id') {
      return combineLatest([
        this.loginService.getInfomationUser(user.id),
        this.homeService.getSingleRoom(route.params['id']),
      ]).pipe(
        map(([user, room]: any) => {
          this.loginService.setUser(user);
          if (room.users.findIndex((x: any) => x.id == user.id) >= 0) {
            return true;
          }
          this.router.navigate(['/home']);
          return false;
        })
      );
    } else {
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
}
