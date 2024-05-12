import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlertModalComponent } from '../../components/alert-modal/alert-modal.component';
import { AlertDialogPayload } from './alert-dialog';

@Injectable({
  providedIn: 'root',
})
export class AlertDialogService {
  constructor(private __dialogService: MatDialog) {}

  popUp(
    alertDialogPlayload :AlertDialogPayload
  ): Observable<any> {
    const matDialogConfig: MatDialogConfig = {
      data: {
        componentData: {
          message: alertDialogPlayload.message,
          errorKey: alertDialogPlayload.key,
          title: alertDialogPlayload.title,
          __buttonConfigs: alertDialogPlayload.buttonConfigs,
        },
      },
      disableClose: true,
    };

    if (alertDialogPlayload.closeOtherPopup) {
      this.__dialogService.closeAll();
    }

    let dialogRef = this.__dialogService.open(
      AlertModalComponent,
      matDialogConfig
    );
    return dialogRef.afterClosed();
  }
}
