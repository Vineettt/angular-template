import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseElementPayload } from 'src/app/shared/elements/base-element/base-element';
import { BaseModalComponent } from 'src/app/shared/elements/base-modal/base-modal.component';
import {
  BasePageComponent,
  SnackBarPayload,
} from 'src/app/shared/elements/base-page/base-page.component';
import { DialogModel } from 'src/app/shared/services/dialog/dialog.service';
import { PROMPTS } from 'src/assets/const/prompts';
import { TITLELIST } from 'src/assets/const/title-list';
import { ButtonType } from 'src/assets/enums/button';
import { Color } from 'src/assets/enums/color';
import { Page } from 'src/assets/enums/page';

@Component({
  selector: 'app-update-route',
  templateUrl: './update-route.component.html',
  styleUrl: './update-route.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UpdateRouteComponent extends BaseModalComponent implements OnInit {
  __handlerSelect: any = {
    id: 'handler',
    element: 'select',
    required: true,
    label: 'Handler',
    value: '',
    itemList: [],
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModel,
    public __dialogRef: MatDialogRef<UpdateRouteComponent>
  ) {
    super(data, __dialogRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initPageConfig(this.data?.componentData?.init_page);
    this.__title = TITLELIST[this.__pageConfig.title];
    if (this.data?.componentData?.list) {
      this.__handlerSelect.itemList = this.data?.componentData?.list;
    }
    if (this.data?.componentData?.row) {
      let elm = this.data?.componentData?.row;
      this.__handlerSelect.value = elm.handler;
      this.__handlerSelect.row_id = elm.id;
    }
  }

  buttonOnClick(event: BaseElementPayload): void {
    if (event?.id === 'ok') {
      let snackBarPayload = new SnackBarPayload();
      snackBarPayload.panelClass = ['red-snackbar'];
      if (this.data?.componentData?.init_page === Page.UPDATE_ROUTE) {
        if (
          this.__handlerSelect?.value === this.data?.componentData?.row?.handler
        ) {
          snackBarPayload.message = PROMPTS['NO_CHANGES'];
          this.triggerSnackBar(snackBarPayload);
          return;
        }
        let payload = [{
          handler: this.__handlerSelect.value,
          id: this.__handlerSelect.row_id,
        }];
        this.closeModel('ok', payload);
      }
    }
    if (event?.id === 'cancel') {
      this.closeModel('cancel');
    }
  }

  valueChanged(event: BaseElementPayload) {
    if (event.id === 'handler') {
      this.__handlerSelect.value = event.value;
    }
  }
}
