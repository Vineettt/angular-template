import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BaseElementComponent } from '../base-element/base-element.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent extends BaseElementComponent implements OnInit {
  @Output() valueChanged = new EventEmitter();

  constructor() {
    super();
  }
  ngOnInit(): void {
    super.ngOnInit();
  }

  onValueChange(newValue: string) {
    this.valueChanged.emit({
      id: this.__id,
      label: this.__label,
      element: this.__element,
      value: newValue,
    });
  }
}
