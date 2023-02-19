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
    const user = localStorage.getItem('username') || '';
    if (!user) {
      this.router.navigate(['/login']);
      return false
    }
    if(state.url.includes('login')) {
      this.router.navigate(['/home']);
      return false
    }
    return true;
  }
}
