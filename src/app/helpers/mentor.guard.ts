import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthenticationService } from '../services';
import { ToastService } from '../global/toast/toast.service';

@Injectable({ providedIn: 'root' })
export class MentorGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastService: ToastService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.userValue;
    if (user && (user.role === 'ADMIN' || user.role === 'MENTOR')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.toastService.danger({
      text: 'Cannot Access as Mentor',
    });
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
