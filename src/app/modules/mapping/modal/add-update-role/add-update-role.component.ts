import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseElementPayload } from 'src/app/shared/elements/base-element/base-element';
import { BaseModalComponent } from 'src/app/shared/elements/base-modal/base-modal.component';
import { SnackBarPayload } from 'src/app/shared/elements/base-page/base-page.component';
import { DialogModel } from 'src/app/shared/services/dialog/dialog.service';
import { PROMPTS } from 'src/assets/const/prompts';
import { TITLELIST } from 'src/assets/const/title-list';
import { Page } from 'src/assets/enums/page';

@Component({
  selector: 'app-add-update-role',
  templateUrl: './add-update-role.component.html',
  styleUrl: './add-update-role.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddUpdateRoleComponent
  extends BaseModalComponent
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModel,
    public __dialogRef: MatDialogRef<AddUpdateRoleComponent>
  ) {
    super(data, __dialogRef);
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
      let snackBarPayload = new SnackBarPayload();
      snackBarPayload.panelClass = ['red-snackbar']
      if (this.__roleInput?.value?.length === 0) {
        snackBarPayload.message = PROMPTS['FIELDS_REQUIRED'];
        this.triggerSnackBar(snackBarPayload);
        return;
      }
      if(this.data?.componentData?.init_page === Page.ADD_ROLE){      
        let payload = [{
          role: this.__roleInput.value,
        }];
        this.closeModel('ok', payload);
      }
      if(this.data?.componentData?.init_page === Page.UPDATE_ROLE){
        if (this.__roleInput?.value === this.data?.componentData?.row?.role) {
          snackBarPayload.message = PROMPTS['NO_CHANGES'];
          this.triggerSnackBar(snackBarPayload);
          return;
        }
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
}
