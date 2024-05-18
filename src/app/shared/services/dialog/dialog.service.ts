import { Injectable } from '@angular/core';
import { AppInjector } from 'src/app/app.module';
import { AppEvent, AppEventType, EventQueueService } from '../event-queue/event-queue.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from "@angular/cdk/portal";

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  __dialogRef!: MatDialogRef<any>;

  __eventQueueService!: EventQueueService;

  __dialog !: MatDialog;

  constructor() {
    this.__eventQueueService = AppInjector.get(EventQueueService);
    this.__dialog = AppInjector.get(MatDialog);
  }

  openDialog(
    component: ComponentType<unknown>,
    data?: any,
    closeOtherDialog?: boolean,
    disableClose: boolean = true,
    
  ) {
    
    if (closeOtherDialog) {
      this.__dialog.closeAll();
    }
    let passed_data = data ? data : {};
    passed_data['restoreFocus'] = true;
    passed_data['disableClose'] = disableClose;
    this.__dialogRef = this.__dialog.open(component, passed_data);
    this.__dialogRef.afterOpened().subscribe((result) => {
      this.__eventQueueService.dispatch(new AppEvent(AppEventType.onPause, data));
    });
  }

  disconnectEventService() {
    this.__eventQueueService.unsubscribe();
  }

  closeDialog(
    closeResult: any,
    closeOtherDialog?: boolean,
    dialogRef?: MatDialogRef<any>
  ) {

    if (dialogRef) {
      
      dialogRef.beforeClosed().subscribe((result) => {
        this.__eventQueueService.dispatch(
          new AppEvent(AppEventType.onResume, closeResult)
        );
      });
      if (closeOtherDialog) {
        this.__dialog.closeAll();
      } else {
        dialogRef.close();
      }
    } else {
      this.__dialogRef.beforeClosed().subscribe((result) => {
        this.__eventQueueService.dispatch(
          new AppEvent(AppEventType.onResume, closeResult)
        );
      });

      if (closeOtherDialog) {
        this.__dialog.closeAll();
      } else {
        this.__dialogRef.close();
      }
    }
  }
}

export class DialogModel {
  id!: string;
  parent_id!: string;
  pause_id!: string;
  resume_id!: string;
  payload!: any;
  parent_data!:any;
  componentData!: any;
  action!: string|undefined;
  buttonConfigs!: any;
}
