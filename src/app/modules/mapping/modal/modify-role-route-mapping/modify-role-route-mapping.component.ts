import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseElementPayload } from 'src/app/shared/elements/base-element/base-element';
import { BasePageComponent, SnackBarPayload } from 'src/app/shared/elements/base-page/base-page.component';
import { DialogModel } from 'src/app/shared/services/dialog/dialog.service';
import { PROMPTS } from 'src/assets/const/prompts';
import { TITLELIST } from 'src/assets/const/title-list';
import { ButtonType } from 'src/assets/enums/button';
import { Color } from 'src/assets/enums/color';
import { Page } from 'src/assets/enums/page';
import { UpdateRouteComponent } from '../update-route/update-route.component';

@Component({
  selector: 'app-modify-role-route-mapping',
  templateUrl: './modify-role-route-mapping.component.html',
  styleUrl: './modify-role-route-mapping.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ModifyRoleRouteMappingComponent extends BasePageComponent implements OnInit {
  __routesList: any = {
    id: 'route',
    element: 'list',
    required: true,
    label: 'Routes',
    value: [],
    multiple: true,
    itemList: [],
    bindValue: 'id',
    bindLabel: 'endpoint_method',
  };

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
    private __dialogRef: MatDialogRef<UpdateRouteComponent>
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initPageConfig(this.data?.componentData?.init_page);
    this.__title = TITLELIST[this.__pageConfig.title];
    if (this.data?.componentData?.list) {
      this.__routesList.itemList = this.data?.componentData?.list;
      this.__routesList.value = this.data?.componentData?.selected? this.data?.componentData?.selected : [];
      this.__routesList.role = this.data?.componentData?.role;
    }
  }

  buttonOnClick(event: BaseElementPayload): void {
    if (event?.id === 'ok') {
      let snackBarPayload = new SnackBarPayload();
      snackBarPayload.panelClass = ['red-snackbar'];
      if (this.data?.componentData?.init_page === Page.MODIFY_ROLE_ROUTE_MAPPING) {
        if (
          this.__routesList?.value?.length === 0
        ) {
          snackBarPayload.message = PROMPTS['SELECT_REQUIRED'];
          this.triggerSnackBar(snackBarPayload);
          return;
        }
        let payload: any[] = [];
        for (const itr of this.__routesList?.value) {
          let tempObj : any = {};
          tempObj.role_id = this.__routesList.role;
          tempObj.route_id = itr,
          payload.push(tempObj)
        }
        console.log(payload)
        this.closeModel('ok', payload);
      }
    }
    if (event?.id === 'cancel') {
      this.closeModel('cancel');
    }
  }

  valueChanged(event: BaseElementPayload) {
    if (event.id === 'route') {
      this.__routesList.value = event.value;
    }
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
}
