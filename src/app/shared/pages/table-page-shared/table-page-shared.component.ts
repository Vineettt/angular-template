import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../../elements/base-page/base-page.component';
import { AlertDialogPayload } from '../../services/alert-dialog/alert-dialog';
import { APIRequestPayload, HttpMethod, Endpoint } from '../../services/api-call/api-call';

@Component({
  selector: 'app-table-page-shared',
  templateUrl: './table-page-shared.component.html',
  styleUrl: './table-page-shared.component.scss'
})
export class TablePageSharedComponent extends BasePageComponent implements OnInit {

  __searchInput: any = {
    id: 'search',
    element: 'input',
    type: 'text',
    required: true,
    label: 'Search',
    value: '',
  };

  __table: any = {
    id: 'table',
    element: 'table',
    displayedColumns :  [],
    columnData : [],
    dataSource: [],
    pageSize: 10,
    pageOffset:  0,
    pageSizeOptions: [10, 25, 50, 100],
    length: -1,
    pageIndex: 0
  };
  
  __method!: any;
  __endpoint!:any;

  __typingTimer!:any;

  constructor(private __cDRefs: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  triggerPageChange(data: any) {
    this.__table.pageSize = data.pageSize;
    this.__table.pageOffset = data.pageIndex * data.pageSize;
    this.__table.pageIndex = data.pageIndex;
    this.getTableData();
  }

  getTableData() {
    let body = {
      limit: this.__table.pageSize,
      offset: this.__table.pageOffset,
      search: this.__table.searchInput?.value || ""
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

  valueChanged(event: any) {
    if(event?.id === 'search'){
      this.__searchInput.value = event?.value;
      clearTimeout(this.__typingTimer); 

      this.__typingTimer = setTimeout(() => {
        this.getTableData();
      }, 2000); 
    }
  }
}
