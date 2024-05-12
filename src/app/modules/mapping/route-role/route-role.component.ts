import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BasePageComponent } from 'src/app/shared/elements/base-page/base-page.component';
import { AlertDialogPayload } from 'src/app/shared/services/alert-dialog/alert-dialog';
import { APIRequestPayload, HttpMethod, Endpoint } from 'src/app/shared/services/api-call/api-call';

@Component({
  selector: 'app-route-role',
  templateUrl: './route-role.component.html',
  styleUrl: './route-role.component.scss'
})
export class RouteRoleComponent extends BasePageComponent implements OnInit {
  __displayedColumns = ['role', 'endpoint', 'method', 'handler', 'edit', 'delete'];
  __dataSource = [];
  __columnData = [
    { prop: 'role', displayName: 'Role' },
    { prop: 'endpoint', displayName: 'Endpoint' },
    { prop: 'handler', displayName: 'Handler' },
    { prop: 'method', displayName: 'Method' },
    { prop: 'edit', displayName: 'Edit', editOption: 'button', icon: 'edit' },
    { prop: 'delete', displayName: 'Delete',  editOption: 'button', icon: 'delete' },
  ];

  __pageSize: any = 10;
  __pageOffset: any = 0;
  __pageSizeOptions: any = [10, 25, 50, 100];
  __length: any = -1;
  __pageIndex: any = 0;
  __apiCallService: any;
  __alertDialogService: any;

  constructor(private __cDRefs: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getTableData();
  }

  triggerPageChange(data: any) {
    this.__pageSize = data.pageSize;
    this.__pageOffset = data.pageIndex * data.pageSize;
    this.__pageIndex = data.pageIndex;
    this.getTableData();
  }

  getTableData() {
    let body = {
      limit: this.__pageSize,
      offset: this.__pageOffset,
    };
    let requestPayloadObject = new APIRequestPayload();
    requestPayloadObject.method = HttpMethod.POST;
    requestPayloadObject.endpoint = Endpoint.ROLE_ROUTE_MAPPINGS;
    requestPayloadObject.body = body;

    this.__apiCallService.callService(requestPayloadObject).subscribe({
      next: (res: any) => {
        this.__dataSource = res?.payload;
        this.__length = res?.length;
        this.__cDRefs.detectChanges();
      },
      error: async (err: any) => {
        let payload = this.formatErrorMessage(err.error);
        if (payload?.status && payload?.type === 'error') {
          let alertDialogPayload = new AlertDialogPayload();
          alertDialogPayload.message = payload?.message;
          alertDialogPayload.key = payload?.key;
          alertDialogPayload.title = 'Alert';
          let rPayload = await this.__alertDialogService
            .popUp(alertDialogPayload)
            .toPromise();
        }
      },
      complete: () => {},
    });
  }
}
