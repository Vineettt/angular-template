import { Injectable } from '@angular/core';
import { AppLoadService } from '../app-load/app-load.service';
import { AppInjector } from 'src/app/app.module';
import { permissionsConfig } from 'src/assets/const/permissions';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {

  permissionArray!: any;

  __appLoadService: AppLoadService;

  constructor() {
    this.__appLoadService = AppInjector.get(AppLoadService);
  }

  getPermission(expectedRoleArray: any) {
    if (this.__appLoadService.permissions == undefined) {
      return false;
    }
    if(expectedRoleArray === undefined || expectedRoleArray.length === 0){
      return true;
    }
    this.permissionArray = this.__appLoadService.permissions;

    for (let i = 0; i < expectedRoleArray.length; i++) {
      let pAObject = permissionsConfig[expectedRoleArray[i]];
      if(pAObject === undefined){
        continue;
      }
      let findIndex = this.permissionArray.findIndex((el: any) => {
        return (
          el.method === pAObject.method && el.endpoint === pAObject.endpoint
        );
      });
      if (findIndex > -1) {
        return true;
      }
    }
    return false;
  }
}
