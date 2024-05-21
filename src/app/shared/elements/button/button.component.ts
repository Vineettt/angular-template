import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { BaseElementComponent } from '../base-element/base-element.component';
import { ButtonType } from 'src/assets/enums/button';
import { BaseElementPayload } from '../base-element/base-element';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent extends BaseElementComponent implements OnInit {
  @Input('color') __color!: string;

  @Output() onClick = new EventEmitter();

  constructor() {
    super();
  }
  ngOnInit(): void {
    super.ngOnInit();
  }

  buttonClick(e: Event) {
    let bEPayload = new BaseElementPayload();
    bEPayload.id = this.__id;
    bEPayload.label = this.__label;
    bEPayload.element = this.__element;
    bEPayload.event = e;
    bEPayload.icon = this.__icon;
    this.onClick.emit(bEPayload);
  }
}
