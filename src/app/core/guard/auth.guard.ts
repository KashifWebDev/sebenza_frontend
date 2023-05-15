import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import {AuthService} from "../../views/pages/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private service: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.service.isLoggedIn()) {
      // logged in so return true
      return true;
    }
    console.error("Auth Guard Error");

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
