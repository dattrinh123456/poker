import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn:'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let user = localStorage.getItem('username') || '';
    console.log(user,state)
    if (!user && !state.url.includes('login')) {
      this.router.navigate(['/login']);
      return false
    }
    if(user && state.url.includes('login')) {
      this.router.navigate(['/home']);
      return false
    }
    return true;
  }
}
