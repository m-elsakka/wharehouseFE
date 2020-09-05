import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { ROUTES } from '../../sidebar/sidebar-routes.config';
import { RouteInfo } from '../../sidebar/sidebar.metadata';

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class AuthoritiesGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let canAccess;
    canAccess = false;
    $.getScript('./assets/js/app-sidebar.js');
    const menuItems = ROUTES.filter((menuItem) => menuItem);
    const url = state.url;
    let requtestPage: RouteInfo;
    for (let i = 0; i < menuItems.length; i++) {
      if (url.includes(menuItems[i].path)) {
        requtestPage = menuItems[i];
        break;
      }
    }

    let authorities = this.authService.authorities;
    if (authorities === null || authorities === undefined) {
      this.authService.reloadAuthorities();
      authorities = this.authService.authorities;
    }

    for (let i = 0; i < requtestPage.authorities.length; i++) {
      if (authorities.includes(requtestPage.authorities[i])) {
        canAccess = true;
        break;
      }
    }
    if (!canAccess) {
      this.router.navigate(['/full-layout/access-denied']);
    }
    return canAccess;
  }
}
