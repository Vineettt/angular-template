import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseElementPayload } from '../base-element/base-element';
import { BaseElementComponent } from '../base-element/base-element.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseElementComponent implements OnInit {
  @Input('item-list') __itemsList!: any;

  @Input('multiple') __multiple: boolean = false;

  @Input('bindLabel') __bindLabel: string = "viewValue";

  @Input('bindValue') __bindValue: string = "value";

  @Output() valueChanged = new EventEmitter();

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
}
