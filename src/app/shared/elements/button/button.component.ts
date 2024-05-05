import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseElementComponent } from '../base-element/base-element.component';
import { ButtonType } from 'src/assets/enums/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent extends BaseElementComponent implements OnInit {
  __color!: string;

  @Output() onClick = new EventEmitter();

  @Input() set color(value: string | undefined) {
    if (value) {
      this.__color = value;
    }
  }

  constructor() {
    super();
  }
  ngOnInit(): void {
    super.ngOnInit();
  }

  buttonClick(e: Event) {
    this.onClick.emit({ id: this.__id, label: this.__label, element: this.__element, event: e });
  }
}
