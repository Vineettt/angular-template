import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseElementPayload } from 'src/app/shared/elements/base-element/base-element';
import { TablePayload } from 'src/app/shared/elements/table/table';
import { TablePageSharedComponent } from 'src/app/shared/pages/table-page-shared/table-page-shared.component';
import { HttpMethod, Endpoint, APIRequestPayload } from 'src/app/shared/services/api-call/api-call';
import { DialogModel } from 'src/app/shared/services/dialog/dialog.service';
import { TITLELIST } from 'src/assets/const/title-list';
import { ButtonType } from 'src/assets/enums/button';
import { Page } from 'src/assets/enums/page';
import { AddUpdateUserComponent } from '../../modal/add-update-user/add-update-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent extends TablePageSharedComponent implements OnInit {
  
  __addButton: any = {
    id: 'add',
    element: 'button',
    type: ButtonType.miniFab,
    icon: 'add',
  };

  constructor(__cDRefs: ChangeDetectorRef) {
    super(__cDRefs);
  }

  

  ngOnInit(): void {
    super.ngOnInit();
    this.initPageConfig(Page.USERS);
    this.__title = TITLELIST[this.__pageConfig.title];
    this.__table.displayedColumns = ['email', 'first_name', 'last_name', 'user_status', 'edit'];
    this.__table.columnData = [
      { prop: 'email', displayName: 'Email' },
      { prop: 'first_name', displayName: 'First Name' },
      { prop: 'last_name', displayName: 'Last Name' },
      { prop: 'user_status', displayName: 'Status' },
      {
        prop: 'edit',
        displayName: 'Edit',
        editOption: 'button',
        icon: 'edit',
        type: 'icon',
      }
    ];
    this.__method = HttpMethod.POST;
    this.__endpoint = Endpoint.USERS;
    this.getTableData();
  }

  buttonOnClick(event: BaseElementPayload) {
    if (event.id === 'add') {
      let cData: any = {
        init_page: Page.ADD_USER,
      };
      this.initAddUpdateRole(cData);
    }
  }

  initAddUpdateRole(componentData?: any) {
    let dModel = new DialogModel();
    dModel.id = this.__pageConfig?.page_id;
    if (componentData) {
      dModel.componentData = componentData;
    }
    this.__dialogService.openDialog(AddUpdateUserComponent, { data: dModel });
  }

  async initEditRow(event: TablePayload) {
    let requestPayloadObject = new APIRequestPayload();
    requestPayloadObject.method = HttpMethod.GET;
    requestPayloadObject.endpoint = Endpoint.USER_STATUS;
    let list = [];
    try {
      let response = await this.__apiCallService
      .callService(requestPayloadObject)
      .toPromise();
      list = response?.payload || [];
    } catch (error) {
      list =  [];
    }
    let cData: any = {
      init_page: Page.UPDATE_USER,
      row: event.element,
      list
    };
    this.initAddUpdateRole(cData);
  }

  onResume(result: any): void {
    super.onResume(result);
    if (this.__pageConfig?.page_id === result?.data?.parent_id) {
      switch (result?.data?.id) {
        case Page.ADD_USER:
          if (result?.data?.action === 'ok') {
            this.getTableData();
          }
          break;
        case Page.UPDATE_USER:
          if (result?.data?.action === 'ok') {
            this.getTableData();
          }
          break;
        default:
          break;
      }
    }
  }
}
