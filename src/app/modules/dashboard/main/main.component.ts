import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from 'src/app/shared/elements/base-page/base-page.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent extends BasePageComponent implements OnInit {
  constructor() {
    super();
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.__appLoadService.setviewType('sidebar');
  }
}
