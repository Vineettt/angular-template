import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertButtonConfig, AlertModalButtonEnum} from 'src/assets/enums/alert-modal';
import { ButtonType } from 'src/assets/enums/button';
import { Color } from 'src/assets/enums/color';
import { DialogModel } from '../../services/dialog/dialog.service';
import { BaseElementPayload } from '../../elements/base-element/base-element';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,  
    private __dialogRef: MatDialogRef<AlertModalComponent>
  ) {
  }

  ngOnInit(): void {
    if(this.data?.componentData?.buttonConfigs?.length === 0){
      this.data.componentData.buttonConfigs = [];

      let alertConfig = new AlertButtonConfig();
      alertConfig.buttonName = AlertModalButtonEnum.OK;
      alertConfig.buttonType = ButtonType.flat,
      alertConfig.buttonText = AlertModalButtonEnum.OK;
      alertConfig.buttonColor = Color.primary;
      this.data.componentData.buttonConfigs.push(alertConfig);
    
    }
  }

  buttonClicked(event: BaseElementPayload ): void {
    let dModel = new DialogModel();
    dModel.action = event.label;
    this.__dialogRef.close({
      data: dModel
    });
  }

}