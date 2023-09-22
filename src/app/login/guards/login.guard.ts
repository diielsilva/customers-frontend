import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const loginGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const service: LoginService = inject(LoginService);
  const router: Router = inject(Router);

  if (route.url[0].path == 'login') {
    service.logout();
    return true;
  }

  if (service.hasOnlineUser()) {
    return true;
  }

  router.navigate(['']);
  return false;

};
