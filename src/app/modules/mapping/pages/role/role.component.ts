import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TablePageSharedComponent } from 'src/app/shared/pages/table-page-shared/table-page-shared.component';
import {
  APIRequestPayload,
  Endpoint,
  HttpMethod,
} from 'src/app/shared/services/api-call/api-call';
import { ButtonType } from 'src/assets/enums/button';
import { AddUpdateRoleComponent } from '../../modal/add-update-role/add-update-role.component';
import { Page } from 'src/assets/enums/page';
import { BaseElementPayload } from 'src/app/shared/elements/base-element/base-element';
import { DialogModel } from 'src/app/shared/services/dialog/dialog.service';
import { TablePayload } from 'src/app/shared/elements/table/table';
import { TITLELIST } from 'src/assets/const/title-list';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RoleComponent extends TablePageSharedComponent implements OnInit {
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
    this.initPageConfig(Page.ROLE);
    this.__title = TITLELIST[this.__pageConfig.title];
    this.__table.displayedColumns = ['role', 'edit', 'delete'];
    this.__table.columnData = [
      { prop: 'role', displayName: 'Role' },
      {
        prop: 'edit',
        displayName: 'Edit',
        editOption: 'button',
        icon: 'edit',
        type: 'icon',
      },
      {
        prop: 'delete',
        displayName: 'Delete',
        editOption: 'button',
        icon: 'delete',
        type: 'icon',
      },
    ];
    this.__method = HttpMethod.POST;
    this.__endpoint = Endpoint.ROLES;
    this.getTableData();
  }

  buttonOnClick(event: BaseElementPayload) {
    if (event.id === 'add') {
      let cData: any = {
        init_page: Page.ADD_ROLE,
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
    this.__dialogService.openDialog(AddUpdateRoleComponent, { data: dModel });
  }

  initDeleteRow(event: TablePayload) {
    let body = {
      roles: [
        {
          role_id: event?.element?.id,
        },
      ],
    };
    let requestPayloadObject = new APIRequestPayload();
    requestPayloadObject.method = HttpMethod.DELETE;
    requestPayloadObject.endpoint = Endpoint.ROLE;
    requestPayloadObject.body = body;
    this.triggereRowAction(requestPayloadObject);
  }

  initEditRow(event: TablePayload) {
    let cData: any = {
      init_page: Page.UPDATE_ROLE,
      row: event.element
    };
    this.initAddUpdateRole(cData);
  }

  onResume(result: any): void {
    super.onResume(result);
    if (this.__pageConfig?.page_id === result?.data?.parent_id) {
      switch (result?.data?.id) {
        case Page.ADD_ROLE:
          if (result?.data?.action === 'ok') {
            let rPayload = new APIRequestPayload();
            rPayload.method = HttpMethod.POST;
            rPayload.endpoint = Endpoint.ROLE;
            rPayload.body = result?.data?.payload;
            this.triggereRowAction(rPayload);
          }
          break;
        case Page.UPDATE_ROLE:
          if (result?.data?.action === 'ok') {
            let rPayload = new APIRequestPayload();
            rPayload.method = HttpMethod.PUT;
            rPayload.endpoint = Endpoint.ROLE;
            rPayload.body = {roles : result?.data?.payload};
            this.triggereRowAction(rPayload);
          }
          break;
        default:
          break;
      }
    }
  }
}
