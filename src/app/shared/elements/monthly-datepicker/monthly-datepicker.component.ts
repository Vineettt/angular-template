import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import {format, startOfMonth, endOfMonth} from 'date-fns';
import { BaseElementComponent } from '../base-element/base-element.component';
import { BaseElementPayload } from '../base-element/base-element';

@Component({
  selector: 'app-monthly-datepicker',
  templateUrl: './monthly-datepicker.component.html',
  styleUrl: './monthly-datepicker.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MonthlyDatepickerComponent extends BaseElementComponent implements OnInit {

  @Input('date') __date: any = new FormControl(new Date());

  @Input('format') __format: string = 'yyyy-MM-dd';

  @Output() onMonthlyDateChanged = new EventEmitter();

  constructor() {
    super();
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.getFirstAndLastDate(this.__date.value);
  }

  setMonthAndYear(normalizedMonthAndYear: Date, datepicker: MatDatepicker<Date>) {
    const ctrlValue = this.__date.value ?? new Date();
    ctrlValue.setMonth(normalizedMonthAndYear.getMonth());
    ctrlValue.setFullYear(normalizedMonthAndYear.getFullYear());
    this.__date.setValue(ctrlValue);
    datepicker.close();
    this.getFirstAndLastDate(this.__date.value);
  }

  getFirstAndLastDate(data: Date){
    const startOfMonthChangeFormat = format(startOfMonth(data), this.__format);
    const endOfMonthChangeFormat   = format(endOfMonth(data), this.__format);

    let bEPayload = new BaseElementPayload();
    bEPayload.id = this.__id;
    bEPayload.label = this.__label;
    bEPayload.element = this.__element;
    bEPayload.type = this.__type;
    bEPayload.start_date = startOfMonthChangeFormat;
    bEPayload.end_date = endOfMonthChangeFormat;
    bEPayload.format = this.__format

    this.onMonthlyDateChanged.emit(bEPayload);
  }
}
