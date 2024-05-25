import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { BaseElementPayload } from 'src/app/shared/elements/base-element/base-element';
import { TablePageSharedComponent } from 'src/app/shared/pages/table-page-shared/table-page-shared.component';
import { AlertDialogPayload } from 'src/app/shared/services/alert-dialog/alert-dialog';
import {
  APIRequestPayload,
  HttpMethod,
  Endpoint,
} from 'src/app/shared/services/api-call/api-call';
import { TITLELIST } from 'src/assets/const/title-list';
import { ButtonType } from 'src/assets/enums/button';
import { Page } from 'src/assets/enums/page';
import { ModifyRoleRouteMappingComponent } from '../../modal/modify-role-route-mapping/modify-role-route-mapping.component';
import { DialogModel } from 'src/app/shared/services/dialog/dialog.service';
import { TablePayload } from 'src/app/shared/elements/table/table';

@Component({
  selector: 'app-route-role',
  templateUrl: './route-role.component.html',
  styleUrl: './route-role.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RouteRoleComponent
  extends TablePageSharedComponent
  implements OnInit
{
  __roleSelect: any = {
    id: 'role',
    element: 'select',
    label: 'role',
    value: '',
    itemList: [],
    bindValue: 'id',
    bindLabel: 'role',
  };

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
    this.initPageConfig(Page.ROLE_ROUTE_MAPPING);
    this.__title = TITLELIST[this.__pageConfig.title];
    this.__table.displayedColumns = [
      'role',
      'endpoint',
      'method',
      'handler',
      'delete',
    ];
    this.__table.columnData = [
      { prop: 'role', displayName: 'Role' },
      { prop: 'endpoint', displayName: 'Endpoint' },
      { prop: 'handler', displayName: 'Handler' },
      { prop: 'method', displayName: 'Method' },
      {
        prop: 'delete',
        displayName: 'Delete',
        editOption: 'button',
        icon: 'delete',
        type: 'icon',
      },
    ];
    this.__method = HttpMethod.POST;
    this.__endpoint = Endpoint.ROLE_ROUTE_MAPPINGS;
    this.initilizedInitPage();
  }

  async initilizedInitPage() {
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
      list = [];
    }
    this.__roleSelect.itemList = list;
    if (this.__roleSelect?.itemList?.length > 0) {
      this.__roleSelect.value = this.__roleSelect?.itemList[0]?.id;
    }
    this.getTableData();
  }

  getTableData() {
    let body = {
      limit: this.__table.pageSize,
      offset: this.__table.pageOffset,
      search: this.__searchInput?.value || '',
      role: this.__roleSelect?.value || '',
    };
    let requestPayloadObject = new APIRequestPayload();
    requestPayloadObject.method = this.__method;
    requestPayloadObject.endpoint = this.__endpoint;
    requestPayloadObject.body = body;

    this.__apiCallService.callService(requestPayloadObject).subscribe({
      next: (res: any) => {
        this.__table.dataSource = res?.payload;
        this.__table.length = res?.length;
        this.__cDRefs.detectChanges();
      },
      error: async (err: any) => {
        this.initError(err, requestPayloadObject);
      },
      complete: () => {},
    });
  }

  valueChanged(event: BaseElementPayload) {
    if (event?.id === 'role') {
      this.__roleSelect.value = event?.value;
      this.getTableData();
    }
    if (event?.id === 'search') {
      this.__searchInput.value = event?.value;
      clearTimeout(this.__typingTimer);

      this.__typingTimer = setTimeout(() => {
        this.getTableData();
      }, 2000);
    }
  }

  async buttonOnClick(event: BaseElementPayload) {
    if (event.id === 'add') {
      let body = {
        role: this.__roleSelect?.value || '',
      };
      let requestPayloadObject = new APIRequestPayload();
      requestPayloadObject.method = HttpMethod.POST;
      requestPayloadObject.endpoint = Endpoint.ROUTE;
      requestPayloadObject.body = body;
      let list = [];
      try {
        let response = await this.__apiCallService
          .callService(requestPayloadObject)
          .toPromise();
        list = response?.payload || [];
      } catch (error) {
        list = [];
      }
      list = list.map((el: any) => {
        el['endpoint_method'] = `${el.endpoint} [${el.method}]`;
        return el;
      });
      let cData: any = {
        init_page: Page.MODIFY_ROLE_ROUTE_MAPPING,
        list,
        role: this.__roleSelect?.value,
      };
      this.initModifyRoleRouteMapping(cData);
    }
  }

  initModifyRoleRouteMapping(componentData?: any) {
    let dModel = new DialogModel();
    dModel.id = this.__pageConfig?.page_id;
    if (componentData) {
      dModel.componentData = componentData;
    }
    this.__dialogService.openDialog(ModifyRoleRouteMappingComponent, {
      data: dModel,
    });
  }

  initDeleteRow(event: TablePayload) {
    let body = {
      mapping: [
        {
          mapping_id: event?.element?.id,
        },
      ],
    };
    let requestPayloadObject = new APIRequestPayload();
    requestPayloadObject.method = HttpMethod.DELETE;
    requestPayloadObject.endpoint = Endpoint.ROLE_ROUTE_MAPPING;
    requestPayloadObject.body = body;
    this.triggereRowAction(requestPayloadObject);
  }

  onResume(result: any): void {
    super.onResume(result);
    if (this.__pageConfig?.page_id === result?.data?.parent_id) {
      switch (result?.data?.id) {
        case Page.MODIFY_ROLE_ROUTE_MAPPING:
          if (result?.data?.action === 'ok') {
            let rPayload = new APIRequestPayload();
            rPayload.method = HttpMethod.POST;
            rPayload.endpoint = Endpoint.ROLE_ROUTE_MAPPING;
            rPayload.body = {mapping : result?.data?.payload};
            this.triggereRowAction(rPayload);
          }
          break;
        default:
          break;
      }
    }
  }
}
