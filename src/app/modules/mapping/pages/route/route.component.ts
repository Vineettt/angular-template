import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TablePageSharedComponent } from 'src/app/shared/pages/table-page-shared/table-page-shared.component';
import { AlertDialogPayload } from 'src/app/shared/services/alert-dialog/alert-dialog';
import {
  APIRequestPayload,
  HttpMethod,
  Endpoint,
} from 'src/app/shared/services/api-call/api-call';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrl: './route.component.scss',
})
export class RouteComponent extends TablePageSharedComponent implements OnInit {

  constructor(__cDRefs: ChangeDetectorRef) {
    super(__cDRefs);

  }

  ngOnInit(): void {
    super.ngOnInit();
    this.__table.displayedColumns  = ['endpoint', 'method', 'handler', 'edit'];
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

}