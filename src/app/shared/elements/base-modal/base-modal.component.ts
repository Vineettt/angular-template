import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonType } from 'src/assets/enums/button';
import { Color } from 'src/assets/enums/color';
import { DialogModel } from '../../services/dialog/dialog.service';
import { BaseElementPayload } from '../base-element/base-element';
import { BasePageComponent } from '../base-page/base-page.component';
import { APIRequestPayload } from '../../services/api-call/api-call';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.scss'
})
export class BaseModalComponent extends BasePageComponent implements OnInit {
  __okButton: any = {
    id: 'ok',
    element: 'button',
    type: ButtonType.flat,
    label: 'OK',
    color: Color.primary,
  };

  __cancelButton: any = {
    id: 'cancel',
    element: 'button',
    type: ButtonType.flat,
    label: 'Cancel',
  };

  __title!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModel,
    public __dialogRef: MatDialogRef<BasePageComponent>
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  buttonOnClick(event: BaseElementPayload): void {
  }

  valueChanged(event: BaseElementPayload) {
  }

  closeModel(action?: string, payload?: any) {
    let dModel = new DialogModel();
    dModel.id = this.__pageConfig?.page_id;
    dModel.parent_id = this.data.id;
    dModel.parent_data = this.data;
    dModel.action = action;
    dModel.payload = payload;

    this.__dialogService.closeDialog(
      {
        data: dModel,
      },
      false,
      this.__dialogRef
    );
  }

  triggerAction(requestPayloadObject: APIRequestPayload) {
    let subscr = this.__apiCallService
      .callService(requestPayloadObject)
      .subscribe({
        next: (res: any) => {
          this.closeModel('ok');
        },
        error: async (err: any) => {
          let rPayload = await this.initError(err, requestPayloadObject);
          if (rPayload.status) {
            this.triggerAction(rPayload?.aPayload);
          }
        },
        complete: () => {},
      });
    this.__subscriptions.push(subscr);
  }
}
