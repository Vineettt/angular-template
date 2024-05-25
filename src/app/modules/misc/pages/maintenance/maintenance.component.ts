import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseElementPayload } from 'src/app/shared/elements/base-element/base-element';
import { BasePageComponent } from 'src/app/shared/elements/base-page/base-page.component';
import { ButtonType } from 'src/assets/enums/button';
import { Color } from 'src/assets/enums/color';
import { Page } from 'src/assets/enums/page';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MaintenanceComponent extends BasePageComponent implements OnInit {
  ngOnInit(): void {
      super.ngOnInit();
      this.initPageConfig(Page.MAINTENANCE);
  }
}