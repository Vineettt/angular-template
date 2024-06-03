import { Component, Input, OnInit } from '@angular/core';
import { BaseElementComponent } from '../base-element/base-element.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent extends BaseElementComponent implements OnInit {
  @Input('view') __view!: any;
  @Input('legend') __legend: boolean = true;
  @Input('showLabels') __showLabels: boolean = true;
  @Input('xAxis') __xAxis: boolean = true;
  @Input('yAxis') __yAxis: boolean = true;
  @Input('showYAxisLabel') __showYAxisLabel: boolean = true;
  @Input('showXAxisLabel') __showXAxisLabel: boolean = true;
  @Input('xAxisLabel') __xAxisLabel!: string;
  @Input('yAxisLabel') __yAxisLabel!: string;
  @Input('timeline') __timeline: boolean = false;
  @Input('dataSource') __dataSource: any[] = [];


  @Input('colorScheme') __colorScheme: any = {
    domain: ['#5AA454', '#7aa3e5', '#a8385d', '#aae3f5', '#E44D25', '#CFC0BB'],
  };

  constructor() {
    super();
  }
  ngOnInit(): void {
    super.ngOnInit();
  }
}
