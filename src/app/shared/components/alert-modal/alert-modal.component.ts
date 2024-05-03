import { Component, Inject, OnInit } from '@angular/core';
import { BasePageComponent } from '../../elements/base-page/base-page.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertButtonConfig, AlertModalButtonNameEnum, AlertModalButtonTextEnum, AlertModalButtonTypeEnum } from 'src/assets/enums/alert-modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent extends BasePageComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,  
    private __dialogRef: MatDialogRef<AlertModalComponent>
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    if(this.data.__buttonConfigs === undefined){
      this.data.componentData.__buttonConfigs = [];

      let alertConfig = new AlertButtonConfig();
      alertConfig.buttonName = AlertModalButtonNameEnum.OK;
      alertConfig.buttonType = AlertModalButtonTypeEnum.ACCEPT;
      alertConfig.buttonText = AlertModalButtonTextEnum.OK;
      this.data.componentData.__buttonConfigs.push(alertConfig);
    
    }
  }

  buttonClicked(optionClicked: string): void {
    this.__dialogRef.close({
      data: {
        id: this.data.id,
        parentId: this.data.id,
        pauseId: this.data.pauseId,
        resumeId: this.data.resumeId,
        result: optionClicked
      },
    });
  }

}