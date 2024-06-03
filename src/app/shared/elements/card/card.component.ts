import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseElementComponent } from '../base-element/base-element.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent extends BaseElementComponent implements OnInit {
  @Input('ihtml') __ihtml!: string;
}
