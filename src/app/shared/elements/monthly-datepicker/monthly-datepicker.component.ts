import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BaseElementComponent } from '../base-element/base-element.component';
import { BaseElementPayload } from '../base-element/base-element';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM-YYYY',
  },
  display: {
    dateInput: 'MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-monthly-datepicker',
  templateUrl: './monthly-datepicker.component.html',
  styleUrl: './monthly-datepicker.component.scss',
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  encapsulation: ViewEncapsulation.None,

})
export class MonthlyDatepickerComponent extends BaseElementComponent implements OnInit {

  @Input('date') __date: any = new FormControl(moment());

  @Input('format') __format: string = 'YYYY-MM-DD';

  @Output() onMonthlyDateChanged = new EventEmitter();

  constructor() {
    super();
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.getFirstAndLastDate(this.__date.value._d);
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.__date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.__date.setValue(ctrlValue);
    datepicker.close();
    this.getFirstAndLastDate(this.__date.value._d);
  }

  getFirstAndLastDate(data: any){
    const startOfMonthChangeFormat = moment(data).clone().startOf('month').format(this.__format);
    const endOfMonthChangeFormat   = moment(data).clone().endOf('month').format(this.__format);

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
