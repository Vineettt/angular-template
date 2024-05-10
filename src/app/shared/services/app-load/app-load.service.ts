import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageKey } from 'src/assets/enums/storage-key';
import { StorageService } from '../storage/storage.service';
import { AppInjector } from 'src/app/app.module';
import { ApiCallService } from '../api-call/api-call.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class AppLoadService {

  private _viewType = new BehaviorSubject<string>('no_sidebar');

  viewType$ = this._viewType.asObservable();

  permissions: any;

  user: any;

  authToken: any;

  __storageService: StorageService;

  __apiCallService: ApiCallService;

  __router: Router;

  constructor() {
    this.__storageService = AppInjector.get(StorageService);
    this.__apiCallService = AppInjector.get(ApiCallService);
    this.__router = AppInjector.get(Router);
  }

  storeUserData(user: any, token: string) {
    this.__storageService.setItem(StorageKey.TOKEN, token);
    this.__storageService.setItem(StorageKey.USER, JSON.stringify(user));
    this.__storageService.setItem(StorageKey.PERMISSIONS, JSON.stringify(user.permissions));
    this.permissions = user.permissions;
    console.log(this.permissions);
    console.log( JSON.stringify(user.permissions));

    this.user = user;
    this.authToken = token;
    this.setviewType('sidebar');
    return { user: user, roles: user.roles, id: user.id };
  }

  loadUser() {
    const users = this.__storageService.getItem(StorageKey.USER);
    if (users == undefined) {
      return null;
    }
    this.setviewType('sidebar');
    let permissions = this.__storageService.getItem(StorageKey.PERMISSIONS);
    if(permissions){
      this.permissions = JSON.parse(permissions);
    }
    this.user = users;
    const roles = users.roles;
    const id = users.id;
    return { user: users, roles: roles, id: id };
  }

  loadToken() {
    const token = this.__storageService.getItem(StorageKey.TOKEN);
    if (token == null) {
      return;
    }
    this.authToken = token;
    return { token: token };
  }

  loggedIn() {
    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(this.authToken);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    this.__storageService.clear();
  }

  setviewType(v: string) {
    this._viewType.next(v);
  }
}
