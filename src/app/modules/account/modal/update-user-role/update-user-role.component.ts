import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseElementPayload } from 'src/app/shared/elements/base-element/base-element';
import { BaseModalComponent } from 'src/app/shared/elements/base-modal/base-modal.component';
import { SnackBarPayload } from 'src/app/shared/elements/base-page/base-page.component';
import { APIRequestPayload, HttpMethod, Endpoint } from 'src/app/shared/services/api-call/api-call';
import { DialogModel } from 'src/app/shared/services/dialog/dialog.service';
import { Utility } from 'src/app/shared/utilities/utility';
import { PROMPTS } from 'src/assets/const/prompts';
import { TITLELIST } from 'src/assets/const/title-list';
import { Page } from 'src/assets/enums/page';

@Component({
  selector: 'app-update-user-role',
  templateUrl: './update-user-role.component.html',
  styleUrl: './update-user-role.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UpdateUserRoleComponent extends BaseModalComponent implements OnInit {
  __roleSelect: any = {
    id: 'role',
    element: 'select',
    required: true,
    label: 'Role',
    value: '',
    itemList: [],
    bindValue: 'id',
    bindLabel: 'role',
    multiple: true
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModel,
    public __dialogRef: MatDialogRef<UpdateUserRoleComponent>
  ) {
    super(data, __dialogRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initPageConfig(this.data?.componentData?.init_page);
    this.__title = TITLELIST[this.__pageConfig.title];
    if (this.data?.componentData?.list) {
      this.__roleSelect.itemList = this.data?.componentData?.list;
    }
    if (this.data?.componentData?.row) {
      let elm = this.data?.componentData?.row;
      let roleArray = elm.roles.split(",");
      const filteredData = this.__roleSelect.itemList?.filter((obj: { role: any; }) => roleArray.includes(obj.role));
      this.__roleSelect.value = filteredData.map((obj: any) => obj.id);
      this.__roleSelect.us_fk_id = elm.us_fk_id;
    }
  }

  buttonOnClick(event: BaseElementPayload): void {
    if (event?.id === 'ok') {
      let snackBarPayload = new SnackBarPayload();
      snackBarPayload.panelClass = ['red-snackbar'];
      if (this.data?.componentData?.init_page === Page.UPDATE_USER_ROLE) {
        if (  this.__roleSelect?.value?.length === 0) {
          snackBarPayload.message = PROMPTS['FIELDS_REQUIRED'];
          this.triggerSnackBar(snackBarPayload);
          return;
        }
        let elm = this.data?.componentData?.row;
        let roleArray = elm.roles.split(",");
        const filteredData = this.__roleSelect.itemList?.filter((obj: { role: any; }) => roleArray.includes(obj.role));
        let prevValue = filteredData.map((obj: any) => obj.id);
        const valueChangedPrev = Utility.onlyInLeft(
          this.__roleSelect?.value,
          prevValue,
          this.isSimilar
        );
        const valueChangedNew = Utility.onlyInLeft(
          prevValue,
          this.__roleSelect?.value,
          this.isSimilar
        );
        if (valueChangedPrev?.length === 0 &&  valueChangedNew?.length === 0) {
          snackBarPayload.message = PROMPTS['NO_CHANGES'];
          this.triggerSnackBar(snackBarPayload);
          return;
        }

        let mapping: any[] = [];
        for (const itr of this.__roleSelect?.value) {
          let tObj : any = {};
          tObj.user_fk_id = this.__roleSelect.us_fk_id;
          tObj.role_fk_id = itr;
          mapping.push(tObj)
        }

        let rPayload = new APIRequestPayload();
        rPayload.method = HttpMethod.PUT;
        rPayload.endpoint = Endpoint.USER_ROLE_MAPPING;
        rPayload.body = { mapping: mapping };
        this.triggerAction(rPayload);
      }
    }
    if (event?.id === 'cancel') {
      this.closeModel('cancel');
    }
  }

  valueChanged(event: BaseElementPayload) {
    if (event.id === 'role') {
      this.__roleSelect.value = event.value;
    }
  }

  isSimilar(a: any, b: any) {
    return (
      a === b
    );
  }
}
