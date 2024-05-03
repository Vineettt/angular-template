import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { PermissionService } from '../services/permissions/permission.service';
import { AppLoadService } from '../services/app-load/app-load.service';
import { StorageService } from '../services/storage/storage.service';
import { StorageKey } from 'src/assets/enums/storage-key';
import { AppInjector } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard  {

  user:any;

  __appLoadService !: AppLoadService;

  __router !: Router;

  __permissionService !: PermissionService;

  __storageService !: StorageService;


  constructor(
  ) {
    this.__appLoadService = AppInjector.get(AppLoadService);
    this.__router = AppInjector.get(Router);
    this.__permissionService = AppInjector.get(PermissionService);
    this.__storageService = AppInjector.get(StorageService);
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    if (
      !this.__appLoadService.loggedIn() &&
      this.__appLoadService.user == undefined
    ) {
      this.__appLoadService.loadUser();
      this.__appLoadService.loadToken();
    }

    
    let expectedPermissionArray = route?.data?.permissions === undefined ? [] : route?.data?.permissions;
    let permissionsArray = this.__appLoadService.permissions;
    let expectedRole = false;

    if (permissionsArray == undefined) permissionsArray = [];

    for (let i = 0; i < expectedPermissionArray?.length; i++) {
      for (let j = 0; j < permissionsArray.length; j++) {
        if (expectedPermissionArray[i] == permissionsArray[j]) {
          expectedRole = true;
          break;
        }
      }
    }
    if (expectedRole === true) {
      return true;
    } else if (!this.__appLoadService.loggedIn() &&
      this.__appLoadService.user == undefined
    ) {
      this.__router.navigate(['/']);
      return false;
    } else {
      this.__router.navigate(['server/permission-denied']);
      return false;
    }
  }
  
}
