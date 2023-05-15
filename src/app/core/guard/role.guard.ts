import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserRole} from "../roles/UserRole";
import {AuthService} from "../../views/pages/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles = route.data.roles as UserRole[];
    const currentUserRole = this.authService.getUserRole();

    if (roles.includes(currentUserRole)) {
      return true;
    }
    console.error("Role Guard Error! Allowed: ",roles," Provided: ",currentUserRole);
    this.router.navigate(['/error/401']);
    return false;
  }

}
