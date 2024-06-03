import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseElementPayload } from 'src/app/shared/elements/base-element/base-element';
import { BaseModalComponent } from 'src/app/shared/elements/base-modal/base-modal.component';
import {
  BasePageComponent,
  SnackBarPayload,
} from 'src/app/shared/elements/base-page/base-page.component';
import {
  APIRequestPayload,
  Endpoint,
  HttpMethod,
} from 'src/app/shared/services/api-call/api-call';
import { DialogModel } from 'src/app/shared/services/dialog/dialog.service';
import { Utility } from 'src/app/shared/utilities/utility';
import { PROMPTS } from 'src/assets/const/prompts';
import { TITLELIST } from 'src/assets/const/title-list';
import { Page } from 'src/assets/enums/page';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrl: './add-update-user.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddUpdateUserComponent
  extends BaseModalComponent
  implements OnInit
{
  __statusSelect: any = {
    id: 'status',
    element: 'select',
    required: true,
    label: 'Status',
    value: '',
    itemList: [],
    disabled: false,
  };

  __emailInput: any = {
    id: 'email',
    element: 'input',
    type: 'text',
    required: true,
    label: 'Email',
    value: '',
    disabled: false,
  };

  __firstNameInput: any = {
    id: 'first_name',
    element: 'input',
    type: 'text',
    required: true,
    label: 'First Name',
    value: '',
    disabled: false,
  };

  __passwordInput: any = {
    id: 'password',
    element: 'input',
    type: 'password',
    required: true,
    label: 'Password',
    icon: 'key',
    value: '',
    disabled: false,
  };

  __lastNameInput: any = {
    id: 'last_name',
    element: 'input',
    type: 'text',
    required: true,
    label: 'Last Name',
    value: '',
    disabled: false,
  };

  __editMode: boolean = false;

  __addMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModel,
    public __dialogRef: MatDialogRef<AddUpdateUserComponent>
  ) {
    super(data, __dialogRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initPageConfig(this.data?.componentData?.init_page);
    this.__title = TITLELIST[this.__pageConfig?.title];
    if (this.data?.componentData?.list) {
      this.__statusSelect.itemList = this.data?.componentData?.list;
    }
    if (
      this.data?.componentData?.row &&
      this.data?.componentData?.init_page === Page.UPDATE_USER
    ) {
      let elm = this.data?.componentData?.row;
      let fIndex = this.__statusSelect?.itemList?.findIndex((el: any) => {
        return el.viewValue.includes(elm.user_status);
      });
      if (fIndex !== -1) {
        this.__statusSelect.value =
          this.__statusSelect?.itemList[fIndex]?.value;
      }
      this.__firstNameInput.value = elm?.first_name;
      this.__lastNameInput.value = elm?.last_name;
      this.__emailInput.value = elm?.email;
      this.__emailInput.disabled = true;
    }
    this.__editMode = this.data?.componentData?.init_page === Page.ADD_USER;

    this.__addMode = this.data?.componentData?.init_page === Page.UPDATE_USER;
  }

  async buttonOnClick(event: BaseElementPayload): Promise<void> {
    if (event?.id === 'ok') {
      let snackBarPayload = new SnackBarPayload();
      snackBarPayload.panelClass = ['red-snackbar'];
      if (this.data?.componentData?.init_page === Page.ADD_USER) {
        let payload = {
          email: this.__emailInput.value,
          password: this.__passwordInput.value,
          first_name: this.__firstNameInput.value,
          last_name: this.__lastNameInput.value,
        };
        if (Utility.validateObjectEmpty(payload, ['email', 'password', 'first_name', 'last_name'])) {
          snackBarPayload.message = PROMPTS['FIELDS_REQUIRED'];
          this.triggerSnackBar(snackBarPayload);
          return;
        }
        let rPayload = new APIRequestPayload();
        rPayload.method = HttpMethod.POST;
        rPayload.endpoint = Endpoint.USER;
        rPayload.body = payload;
        this.triggerAction(rPayload);
      }
      if (this.data?.componentData?.init_page === Page.UPDATE_USER) {
        let payload = [
          {
            id: this.data?.componentData?.row?.id,
            email: this.__emailInput.value,
            first_name: this.__firstNameInput.value,
            last_name: this.__lastNameInput.value,
            status: this.__statusSelect.value,
          },
        ];
        if (await Utility.validateArrayEmpty(payload, ['id', 'email', 'first_name', 'last_name', 'status'])) {
          snackBarPayload.message = PROMPTS['FIELDS_REQUIRED'];
          this.triggerSnackBar(snackBarPayload);
          return;
        }

        const valueUpdated = Utility.onlyInLeft(
          payload,
          [this.data?.componentData?.row],
          this.isSimilar
        );

        if (valueUpdated?.length === 0) {
          snackBarPayload.message = PROMPTS['NO_CHANGES'];
          this.triggerSnackBar(snackBarPayload);
          return;
        }
        let rPayload = new APIRequestPayload();
        rPayload.method = HttpMethod.PUT;
        rPayload.endpoint = Endpoint.USER;
        rPayload.body = { user: payload };
        this.triggerAction(rPayload);
      }
    }
    if (event?.id === 'cancel') {
      this.closeModel('cancel');
    }
  }

  valueChanged(event: BaseElementPayload) {
    if (event.id === 'first_name') {
      this.__firstNameInput.value = event.value;
    }
    if (event.id === 'last_name') {
      this.__lastNameInput.value = event.value;
    }
    if (event.id === 'email') {
      this.__emailInput.value = event.value;
    }
    if (event.id === 'password') {
      this.__passwordInput.value = event.value;
    }
    if (event.id === 'status') {
      this.__statusSelect.value = event.value;
    }
  }

  iconClick(event: BaseElementPayload) {
    if (event.id === 'password') {
      this.__passwordInput.type =
        event?.type === 'password' ? 'text' : 'password';
      this.__passwordInput.icon = event?.icon === 'key' ? 'key_off' : 'key';
    }
  }

  isSimilar(a: any, b: any) {
    return (
      a.first_name === b.first_name &&
      a.last_name === b.last_name &&
      a.status.includes(b.user_status)
    );
  }
}
