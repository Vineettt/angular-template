import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TablePayload } from 'src/app/shared/elements/table/table';
import { TablePageSharedComponent } from 'src/app/shared/pages/table-page-shared/table-page-shared.component';
import { HttpMethod, Endpoint, APIRequestPayload } from 'src/app/shared/services/api-call/api-call';
import { DialogModel } from 'src/app/shared/services/dialog/dialog.service';
import { TITLELIST } from 'src/assets/const/title-list';
import { Page } from 'src/assets/enums/page';
import { UpdateUserRoleComponent } from '../../modal/update-user-role/update-user-role.component';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UserRoleComponent extends TablePageSharedComponent implements OnInit {
  
  constructor(__cDRefs: ChangeDetectorRef) {
    super(__cDRefs);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initPageConfig(Page.USER_ROLE);
    this.__title = TITLELIST[this.__pageConfig.title];
    this.__table.displayedColumns = ['email', 'roles', 'edit'];
    this.__table.columnData = [
      { prop: 'email', displayName: 'Email' },
      { prop: 'roles', displayName: 'Roles' },
      {
        prop: 'edit',
        displayName: 'Edit',
        editOption: 'button',
        icon: 'edit',
        type: 'icon',
      }
    ];
    this.__method = HttpMethod.POST;
    this.__endpoint = Endpoint.USER_ROLE_MAPPING;
    this.getTableData();
  }

  initAddUpdateRole(componentData?: any) {
    let dModel = new DialogModel();
    dModel.id = this.__pageConfig?.page_id;
    if (componentData) {
      dModel.componentData = componentData;
    }
    this.__dialogService.openDialog(UpdateUserRoleComponent, { data: dModel });
  }

  async initEditRow(event: TablePayload) {
    let requestPayloadObject = new APIRequestPayload();
    requestPayloadObject.method = HttpMethod.GET;
    requestPayloadObject.endpoint = Endpoint.ROLE;
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
      init_page: Page.UPDATE_USER_ROLE,
      row: event.element,
      list
    };
    this.initAddUpdateRole(cData);
  }

  onResume(result: any): void {
    super.onResume(result);
    if (this.__pageConfig?.page_id === result?.data?.parent_id) {
      switch (result?.data?.id) {
        case Page.UPDATE_USER_ROLE:
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
