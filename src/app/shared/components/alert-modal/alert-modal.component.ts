import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertButtonConfig, AlertModalButtonEnum} from 'src/assets/enums/alert-modal';
import { ButtonType } from 'src/assets/enums/button';
import { Color } from 'src/assets/enums/color';

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
    if(this.data.__buttonConfigs === undefined){
      this.data.componentData.__buttonConfigs = [];

      let alertConfig = new AlertButtonConfig();
      alertConfig.buttonName = AlertModalButtonEnum.OK;
      alertConfig.buttonType = ButtonType.flat,
      alertConfig.buttonText = AlertModalButtonEnum.OK;
      alertConfig.buttonColor = Color.primary;
      this.data.componentData.__buttonConfigs.push(alertConfig);
    
    }
  }

  buttonClicked(optionClicked: string): void {
    this.__dialogRef.close({
      data: {
        result: optionClicked
      },
    });
  }

}