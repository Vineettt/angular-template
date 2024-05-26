import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BaseElementPayload } from '../base-element/base-element';
import { BaseElementComponent } from '../base-element/base-element.component';
import { Utility } from '../../utilities/utility';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent extends BaseElementComponent implements OnInit {
  @Input('multiple') __multiple: boolean = false;

  @Input('bindLabel') __bindLabel: string = 'viewValue';

  @Input('bindValue') __bindValue: string = 'value';

  @Output() valueChanged = new EventEmitter();

  @Input('search') __search: boolean = false;

  __itemsList: any[] = [];

  __filterItemList: any[] = [];

  @Input() set 'item-list'(value: any[]) {
    this.__itemsList = value;
    this.__filterItemList = Utility.breakArrayReferance(value);
  }

  __searchText: string = '';

  constructor() {
    super();
  }
  ngOnInit(): void {
    super.ngOnInit();
  }

  onValueChange(newValue: string) {
    let bEPayload = new BaseElementPayload();
    bEPayload.id = this.__id;
    bEPayload.label = this.__label;
    bEPayload.element = this.__element;
    bEPayload.value = newValue;
    this.valueChanged.emit(bEPayload);
  }

  onSearchText(search: string) {
    this.__searchText = search;
    let tempList = Utility.breakArrayReferance(this.__filterItemList);
    this.__itemsList = tempList.filter((el: any) =>
      el[this.__bindLabel].includes(search)
    );
  }
}
