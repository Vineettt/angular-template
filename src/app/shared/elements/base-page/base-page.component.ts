import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppInjector } from 'src/app/app.module';
import { ApiCallService } from 'src/app/shared/services/api-call/api-call.service';
import { PageService } from '../../services/page/page.service';
import { StorageService } from '../../services/storage/storage.service';
import { StorageKey } from 'src/assets/enums/storage-key';
import { Title } from '@angular/platform-browser';
import { TITLELIST } from 'src/assets/const/title-list';
import { PermissionService } from '../../services/permissions/permission.service';
import { AppLoadService } from '../../services/app-load/app-load.service';
import { Subscription } from 'rxjs';
import {
  AppEvent,
  AppEventType,
  EventQueueService,
} from '../../services/event-queue/event-queue.service';
import { AlertDialogService } from '../../services/alert-dialog/alert-dialog.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertDialogPayload } from '../../services/alert-dialog/alert-dialog';
import {
  AlertButtonConfig,
  AlertModalButtonEnum,
} from 'src/assets/enums/alert-modal';
import { ButtonType } from 'src/assets/enums/button';
import { Color } from 'src/assets/enums/color';
import { APIRequestPayload } from '../../services/api-call/api-call';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss'],
})
export class BasePageComponent implements OnInit {
  __formBuilder!: FormBuilder;

  __apiCallService!: ApiCallService;

  __router!: Router;

  __pageService!: PageService;

  __storageService!: StorageService;

  __appLoadService!: AppLoadService;

  __moduleName!: string;

  __pageConfig!: any;

  __titleService!: Title;

  __title!:string;

  __permissionService: PermissionService;

  __onPauseSubscription!: Subscription;

  __onResumeSubscription!: Subscription;

  __eventQueueService!: EventQueueService;

  __dialogService!: DialogService;

  __location!: Location;

  __alertDialogService!: AlertDialogService;

  __snackBar!: MatSnackBar;

  constructor() {
    this.__formBuilder = AppInjector.get(FormBuilder);
    this.__apiCallService = AppInjector.get(ApiCallService);
    this.__router = AppInjector.get(Router);
    this.__pageService = AppInjector.get(PageService);
    this.__storageService = AppInjector.get(StorageService);
    this.__titleService = AppInjector.get(Title);
    this.__permissionService = AppInjector.get(PermissionService);
    this.__appLoadService = AppInjector.get(AppLoadService);
    this.__eventQueueService = AppInjector.get(EventQueueService);
    this.__dialogService = AppInjector.get(DialogService);
    this.__location = AppInjector.get(Location);
    this.__alertDialogService = AppInjector.get(AlertDialogService);
    this.__snackBar = AppInjector.get(MatSnackBar);
  }

  ngOnInit(): void {
    this.__moduleName = this.__storageService.getItem(StorageKey.MODULE);
    if (this.__onPauseSubscription) this.__onPauseSubscription.unsubscribe();
    if (this.__onResumeSubscription) this.__onResumeSubscription.unsubscribe();
    this.__onPauseSubscription = this.__eventQueueService
      .on(AppEventType.onPause)
      .subscribe((event: AppEvent<any>) => this.onPause(event.payload));

    this.__onResumeSubscription = this.__eventQueueService
      .on(AppEventType.onResume)
      .subscribe((event: AppEvent<any>) => this.onResume(event.payload));
  }

  ngOnDestroy() {
    if (this.__onPauseSubscription) this.__onPauseSubscription.unsubscribe();
    if (this.__onResumeSubscription) this.__onResumeSubscription.unsubscribe();
  }

  initPageConfig(page_id: string) {
    this.__pageConfig =
      this.__pageService.pageConfig[this.__moduleName][page_id];
    this.setTitleName();
  }

  setTitleName() {
    if (this.__pageConfig) {
      let title: any = this.__pageConfig?.title;
      this.__titleService.setTitle(TITLELIST[title]);
    }
  }

  onPause(result: any) {}

  onResume(result: any) {
    if (this.__pageConfig?.page_id === result?.data?.parent_id) {
      this.setTitleName();
    }
  }

  triggerSnackBar(snackBar: SnackBarPayload) {
    let sBar: any = {
      horizontalPosition: snackBar.hozPosition,
      verticalPosition: snackBar.verPostion,
      duration: snackBar.durations,
      panelClass: snackBar.panelClass,
    };
    this.__snackBar.open(snackBar.message, '', sBar);
  }

  async initError(err: any, aPayload: APIRequestPayload) {
    let response: any = {};
    response.status = false;
    let payload = this.formatErrorMessage(err.error);
    let alertDialogPayload = new AlertDialogPayload();
    if (payload?.status && payload?.type === 'error') {
      let snackBarPayload = new SnackBarPayload();
      snackBarPayload.panelClass = ['red-snackbar']
      snackBarPayload.message = payload?.message;
      this.triggerSnackBar(snackBarPayload);
    }
    if (payload?.status && payload?.type === 'warning') {
      alertDialogPayload.message = payload?.message;
      alertDialogPayload.key = payload?.key;
      let okConfig = new AlertButtonConfig();
      okConfig.buttonName = AlertModalButtonEnum.YES;
      (okConfig.buttonType = ButtonType.flat),
        (okConfig.buttonText = AlertModalButtonEnum.YES);
      okConfig.buttonColor = Color.warn;
      alertDialogPayload.buttonConfigs.push(okConfig);

      let cancelConfig = new AlertButtonConfig();
      cancelConfig.buttonName = AlertModalButtonEnum.CANCEL;
      (cancelConfig.buttonType = ButtonType.flat),
        (cancelConfig.buttonText = AlertModalButtonEnum.CANCEL);
      cancelConfig.buttonColor = Color.primary;
      alertDialogPayload.buttonConfigs.push(cancelConfig);

      alertDialogPayload.title = 'Warning';
      let rPayload = await this.__alertDialogService
        .popUp(alertDialogPayload)
        .toPromise();
      if (rPayload?.data?.action === AlertModalButtonEnum.YES) {
        let body: any = aPayload.body;
        body[payload.iKey] = payload.key;
        aPayload.body = body;
        response.status = true;
        response.aPayload = aPayload;
      }
    }
    return response;
  }

  formatErrorMessage(obj: any) {
    let resObject: any = {},
      messageKeyArray: any[] = [],
      messageArray: any[] = [];
    resObject.status = false;
    if (obj === undefined) {
      return resObject;
    }
    if (obj.errors) {
      resObject.status = true;
      let tempO = obj.errors;
      for (const key in tempO) {
        messageKeyArray.push(key);
        messageArray.push(tempO[key]);
      }
      resObject.key = messageKeyArray.join(',');
      resObject.message = messageArray.join('<br>');
      resObject.type = 'error';
    }
    if (obj.warnings) {
      let wObject = obj.warnings;
      let wOArray = Object.keys(wObject);
      const fIndex = wOArray.findIndex((element) =>
        element.startsWith('IGNORE_')
      );
      resObject.status = true;
      resObject.message = wObject.message;
      if (fIndex !== -1) {
        resObject.key = wObject[wOArray[fIndex]];
        resObject.iKey = wOArray[fIndex];
      }
      resObject.type = 'warning';
    }
    return resObject;
  }
}

export class SnackBarPayload {
  message!: string;
  hozPosition: string = 'center';
  verPostion: string = 'top';
  durations: number = 5000;
  panelClass : any = ['green-snackbar']
}
