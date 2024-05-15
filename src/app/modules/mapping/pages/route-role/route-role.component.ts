import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TablePageSharedComponent } from 'src/app/shared/pages/table-page-shared/table-page-shared.component';
import { AlertDialogPayload } from 'src/app/shared/services/alert-dialog/alert-dialog';
import {
  APIRequestPayload,
  HttpMethod,
  Endpoint,
} from 'src/app/shared/services/api-call/api-call';

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
  constructor(__cDRefs: ChangeDetectorRef) {
    super(__cDRefs);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.__table.displayedColumns = [
      'role',
      'endpoint',
      'method',
      'handler',
      'edit',
      'delete',
    ];
    this.__table.columnData = [
      { prop: 'role', displayName: 'Role' },
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
    this.getTableData();
  }
}
