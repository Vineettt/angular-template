import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseElementComponent } from '../base-element/base-element.component';
import { BaseElementPayload } from '../base-element/base-element';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent extends BaseElementComponent implements OnInit {
  @Input('item-list') __itemsList!: any;

  @Input('multiple') __multiple: boolean = false;

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
