import { Component, Input, OnInit } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { AppearanceType } from 'src/assets/enums/apperance';

@Component({
  selector: 'app-base-element',
  templateUrl: './base-element.component.html',
  styleUrl: './base-element.component.scss',
})
export class BaseElementComponent implements OnInit {

  @Input('id') __id!:string

  @Input('element') __element!:string;

  @Input('value') __value!: string;

  @Input('label') __label!: string;

  @Input('type') __type!: string;

  @Input('appearance') __appearance: MatFormFieldAppearance = AppearanceType.outline;

  @Input('required') __required: boolean = false;

  @Input('disabled') __disabled: boolean = false;

  @Input('icon') __icon!: string;

  constructor() {}

  ngOnInit(): void {}
}