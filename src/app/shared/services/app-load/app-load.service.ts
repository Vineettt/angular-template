import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageKey } from 'src/assets/enums/storage-key';
import { StorageService } from '../storage/storage.service';
import { AppInjector } from 'src/app/app.module';
import { APIRequestPayload, HttpMethod, Endpoint } from '../api-call/api-call';
import { ApiCallService } from '../api-call/api-call.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppLoadService {
  allowedUrls!: string[];

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
    this.__storageService.setItem(StorageKey.PERMISSIONS, user.permission);
    this.permissions = user.permissions;
    this.user = user;
    this.authToken = token;

    return { user: user, roles: user.roles, id: user.id };
  }

  loadUser() {
    const users = this.__storageService.getItem(StorageKey.USER);
    if (users == undefined) {
      return null;
    }
    this.permissions = this.__storageService.getItem(StorageKey.PERMISSIONS);
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
}
