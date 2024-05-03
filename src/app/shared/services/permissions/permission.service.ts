import { Injectable } from '@angular/core';
import { AppLoadService } from '../app-load/app-load.service';
import { AppInjector } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  permissionArray!: any;
  
  __appLoadService : AppLoadService;

  constructor() {
    this.__appLoadService = AppInjector.get(AppLoadService);
  }

  getPermission(expectedRoleArray: any) {
    if (this.__appLoadService.permissions == undefined) {
      return false;
    }
    this.permissionArray = this.__appLoadService.permissions;
    for (let i = 0; i < expectedRoleArray.length; i++) {
      for (let j = 0; j < this.permissionArray.length; j++) {
        if (expectedRoleArray[i] == this.permissionArray[j]) {
          return true;
        }
      }
    }
    return false;
  }
}
