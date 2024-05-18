import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { BaseElementComponent } from '../base-element/base-element.component';
import { BaseElementPayload } from '../base-element/base-element';
import { TablePayload } from './table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent extends BaseElementComponent implements OnInit {

  @Input('displayedColumns') __displayedColumns: any;
  @Input('columnData') __columnData: any;
  @Input('dataSource') __dataSource: any;
  @Input('dataSourceLength') __dataSourceLength: any;
  @Input('dataSourcePageSize') __dataSourcePageSize: any;
  @Input('dataSourceIndex') __dataSourceIndex: any;
  @Input('pageSizeOptions') __pageSizeOptions: any = [25, 50, 100];

  @Output() pageChange: EventEmitter<number> = new EventEmitter();
  @Output() buttonClickTableEvent: EventEmitter<any> = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit(): void {}

  onPaginateChange(data: any) {
    this.pageChange.emit(data);
  }

  isTableStructureReady(): boolean{
    let result = false;
    if(this.__displayedColumns && this.__columnData){
      result = this.__displayedColumns.every((columnId: any) => this.__columnData.find((columData: { prop: any; }) => columData.prop === columnId))
    }
    return result;
  }

  buttonOnClick(event: BaseElementPayload, col: any, elm:any) {
     let tPayload = new TablePayload();
     tPayload.column = col;
     tPayload.element = elm;
     this.buttonClickTableEvent.emit(tPayload);
  }
}
