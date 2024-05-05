import { Component, Input, OnInit } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { AppearanceType } from 'src/assets/enums/apperance';

@Component({
  selector: 'app-base-element',
  templateUrl: './base-element.component.html',
  styleUrl: './base-element.component.scss',
})
export class BaseElementComponent implements OnInit {

  __id!:string

  __element!:string;

  __value!: String;

  __label!: String;

  __type!: String;

  __appearance: MatFormFieldAppearance = AppearanceType.outline;

  __required: boolean = false;

  __disabled: boolean = false;

  @Input() set element(value: string) {
    if (value) {
      this.__element = value;
    }
  }

  @Input() set value(value: string | undefined) {
    if (value) {
      this.__value = value;
    }
  }

  @Input() set label(value: string | undefined) {
    if (value) {
      this.__label = value;
    }
  }

  @Input() set type(value: string | undefined) {
    if (value) {
      this.__type = value;
    }
  }

  @Input() set appearance(value: MatFormFieldAppearance | undefined) {
    if (value) {
      this.__appearance = value;
    }
  }

  @Input() set required(value: boolean) {
    if (value) {
      this.__required = value;
    }
  }

  @Input() set disabled(value: boolean) {
    if (value) {
      this.__disabled = value;
    }
  }

  @Input() set id(value: string) {
    if (value) {
      this.__id = value;
    }
  }

  constructor() {}

  ngOnInit(): void {}
}