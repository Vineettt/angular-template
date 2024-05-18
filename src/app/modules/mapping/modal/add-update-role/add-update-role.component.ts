import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseElementPayload } from 'src/app/shared/elements/base-element/base-element';
import { BasePageComponent } from 'src/app/shared/elements/base-page/base-page.component';
import { DialogModel } from 'src/app/shared/services/dialog/dialog.service';
import { TITLELIST } from 'src/assets/const/title-list';
import { ButtonType } from 'src/assets/enums/button';
import { Color } from 'src/assets/enums/color';
import { Page } from 'src/assets/enums/page';

@Component({
  selector: 'app-add-update-role',
  templateUrl: './add-update-role.component.html',
  styleUrl: './add-update-role.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddUpdateRoleComponent
  extends BasePageComponent
  implements OnInit
{
  __roleInput: any = {
    id: 'role',
    element: 'input',
    type: 'text',
    required: true,
    label: 'Role',
    value: '',
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
    private __dialogRef: MatDialogRef<AddUpdateRoleComponent>
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initPageConfig(this.data?.componentData?.init_page);
    this.__title = TITLELIST[this.__pageConfig.title];
    if(this.data?.componentData?.row){
      let elm = this.data?.componentData?.row;
      this.__roleInput.value = elm.role;
      this.__roleInput.row_id = elm.id;
    }
  }

  buttonOnClick(event: BaseElementPayload): void {
    if (event?.id === 'ok') {
      if (this.__roleInput?.value?.length === 0) {
        return;
      }
      if(this.data?.componentData?.init_page === Page.ADD_ROLE){      
        let payload = {
          role: this.__roleInput.value,
        };
        this.closeModel('ok', payload);
      }
      if(this.data?.componentData?.init_page === Page.UPDATE_ROLE){      
        let payload = [{
          role: this.__roleInput.value,
          id:  this.__roleInput.row_id
        }];
        this.closeModel('ok', payload);
      }
    }
    if (event?.id === 'cancel') {
      this.closeModel('cancel');
    }
  }

  valueChanged(event: BaseElementPayload) {
    if (event.id === 'role') {
      this.__roleInput.value = event.value;
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
