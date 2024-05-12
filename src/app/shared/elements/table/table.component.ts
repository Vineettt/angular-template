import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { BaseElementComponent } from '../base-element/base-element.component';

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
  @Output() dialogClicked: EventEmitter<number> = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit(): void {}

  onPaginateChange(data: any) {
    this.pageChange.emit(data);
  }

  updateCompany(data: any) {
    this.dialogClicked.emit(data);
  }

  updateCity(data: any) {
    this.dialogClicked.emit(data);
  }


  isTableStructureReady(): boolean{
    let result = false;
    if(this.__displayedColumns && this.__columnData){
      result = this.__displayedColumns.every((columnId: any) => this.__columnData.find((columData: { prop: any; }) => columData.prop === columnId))
    }
    return result;
  }
}
