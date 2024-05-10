import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { PermissionService } from '../services/permissions/permission.service';
import { AppLoadService } from '../services/app-load/app-load.service';
import { StorageService } from '../services/storage/storage.service';
import { AppInjector } from 'src/app/app.module';
import { permissionsConfig } from 'src/assets/const/permissions';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard {
  user: any;

  __appLoadService!: AppLoadService;

  __router!: Router;

  __permissionService!: PermissionService;

  __storageService!: StorageService;

  constructor() {
    this.__appLoadService = AppInjector.get(AppLoadService);
    this.__router = AppInjector.get(Router);
    this.__permissionService = AppInjector.get(PermissionService);
    this.__storageService = AppInjector.get(StorageService);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      !this.__appLoadService.loggedIn() &&
      (this.__appLoadService.user == undefined ||
        this.__appLoadService.authToken === undefined)
    ) {
      this.__appLoadService.loadUser();
      this.__appLoadService.loadToken();
    }

    if (!this.__appLoadService.loggedIn()) {
      this.__router.navigate(['/auth']);
      return false;
    }

    let expectedPermissionArray =
      route?.data?.permissions === undefined ? [] : route?.data?.permissions;
    let permissionsArray = this.__appLoadService.permissions;
    let expectedRole = false;

    if (permissionsArray == undefined) permissionsArray = [];

    for (let i = 0; i < expectedPermissionArray?.length; i++) {
      let pAObject = permissionsConfig[expectedPermissionArray[i]];
      let findIndex = permissionsArray.findIndex((el: any) => {
        return  el.method === pAObject.method && el.endpoint === pAObject.endpoint
      });
      if (findIndex > -1) {
        expectedRole = true;
        break;
      }
    }

    if(expectedRole){
      return true;
    }else{
      return false;
    }
  }
}
