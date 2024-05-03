import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlertButtonConfig } from 'src/assets/enums/alert-modal';
import { AlertModalComponent } from '../../components/alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AlertDialogService {

  constructor(
    private __dialogService: MatDialog
  ) { }

  popUp(message: string, key: string, buttonConfigs: Array<AlertButtonConfig> | null = null, closeOtherPopup : boolean = false): Observable<any>{
    
    const matDialogConfig: MatDialogConfig = {
      data: {
        componentData:{ 
          message: message,
          errorKey: key,
          __buttonConfigs: buttonConfigs
        },
      },
      disableClose: true
    }

    if(closeOtherPopup){
      this.__dialogService.closeAll()
    }

    let dialogRef = this.__dialogService.open(AlertModalComponent, matDialogConfig);
    return dialogRef.afterClosed();
  }
}
