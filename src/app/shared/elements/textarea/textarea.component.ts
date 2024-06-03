import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { BaseElementPayload } from '../base-element/base-element';
import { BaseElementComponent } from '../base-element/base-element.component';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TextareaComponent extends BaseElementComponent implements OnInit {
  @Output() valueChanged = new EventEmitter();

  @Output() onIconClick = new EventEmitter();

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

  iconClick(event: Event) {
    let bEPayload = new BaseElementPayload();
    bEPayload.id = this.__id;
    bEPayload.label = this.__label;
    bEPayload.element = this.__element;
    bEPayload.icon = this.__icon;
    bEPayload.type = this.__type;
    bEPayload.event = event;
    this.onIconClick.emit(bEPayload);
  }
}
