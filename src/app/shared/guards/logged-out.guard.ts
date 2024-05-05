import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AppLoadService } from '../services/app-load/app-load.service';
import { AppInjector } from 'src/app/app.module';

@Injectable({
  providedIn: 'root',
})
export class LoggedOutGuard implements CanActivate {
  __appLoadService: AppLoadService;

  __router: Router;

  constructor() {
    this.__appLoadService = AppInjector.get(AppLoadService);
    this.__router = AppInjector.get(Router);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.__appLoadService.user == undefined) {
      this.__appLoadService.loadUser();
      this.__appLoadService.loadToken();
    }
    if (this.__appLoadService.loggedIn()) {
      this.__router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
