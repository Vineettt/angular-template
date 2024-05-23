import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TablePayload } from 'src/app/shared/elements/table/table';
import { TablePageSharedComponent } from 'src/app/shared/pages/table-page-shared/table-page-shared.component';
import { AlertDialogPayload } from 'src/app/shared/services/alert-dialog/alert-dialog';
import {
  APIRequestPayload,
  HttpMethod,
  Endpoint,
} from 'src/app/shared/services/api-call/api-call';
import { Page } from 'src/assets/enums/page';
import { UpdateRouteComponent } from '../../modal/update-route/update-route.component';
import { DialogModel } from 'src/app/shared/services/dialog/dialog.service';
import { TITLELIST } from 'src/assets/const/title-list';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrl: './route.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RouteComponent extends TablePageSharedComponent implements OnInit {
  constructor(__cDRefs: ChangeDetectorRef) {
    super(__cDRefs);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initPageConfig(Page.ROUTE);
    this.__title = TITLELIST[this.__pageConfig.title];
    this.__table.displayedColumns = ['endpoint', 'method', 'handler', 'edit'];
    this.__table.columnData = [
      { prop: 'endpoint', displayName: 'Endpoint' },
      { prop: 'handler', displayName: 'Handler' },
      { prop: 'method', displayName: 'Method' },
      {
        prop: 'edit',
        displayName: 'Edit',
        editOption: 'button',
        icon: 'edit',
        type: 'icon',
      },
    ];
    this.__method = HttpMethod.POST;
    this.__endpoint = Endpoint.ROUTES;
    this.getTableData();
  }

  async initEditRow(event: TablePayload) {
    let requestPayloadObject = new APIRequestPayload();
    requestPayloadObject.method = HttpMethod.GET;
    requestPayloadObject.endpoint = Endpoint.HANDLER;
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
      init_page: Page.UPDATE_ROUTE,
      row: event.element,
      list,
    };
    this.initUpdateRoute(cData);
  }

  initUpdateRoute(componentData?: any) {
    let dModel = new DialogModel();
    dModel.id = this.__pageConfig?.page_id;
    if (componentData) {
      dModel.componentData = componentData;
    }
    this.__dialogService.openDialog(UpdateRouteComponent, { data: dModel });
  }

  onResume(result: any): void {
    super.onResume(result);
    if (this.__pageConfig?.page_id === result?.data?.parent_id) {
      switch (result?.data?.id) {
        case Page.UPDATE_ROUTE:
          if (result?.data?.action === 'ok') {
            let rPayload = new APIRequestPayload();
            rPayload.method = HttpMethod.PUT;
            rPayload.endpoint = Endpoint.ROUTE;
            rPayload.body = { routes: result?.data?.payload };
            this.triggereRowAction(rPayload);
          }
          break;
        default:
          break;
      }
    }
  }
}
