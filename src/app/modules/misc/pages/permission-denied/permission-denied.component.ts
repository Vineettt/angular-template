import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseElementPayload } from 'src/app/shared/elements/base-element/base-element';
import { BasePageComponent } from 'src/app/shared/elements/base-page/base-page.component';
import { ButtonType } from 'src/assets/enums/button';
import { Color } from 'src/assets/enums/color';
import { Page } from 'src/assets/enums/page';

@Component({
  selector: 'app-permission-denied',
  templateUrl: './permission-denied.component.html',
  styleUrl: './permission-denied.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PermissionDeniedComponent extends BasePageComponent implements OnInit {
  
  __backToDashboard: any = {
    id: 'back_to_dashboard',
    element: 'button',
    type: ButtonType.flat,
    label: 'Back to Dashboard',
    color: Color.primary,
  };

  ngOnInit(): void {
      super.ngOnInit();
      this.initPageConfig(Page.NOT_FOUND);
  }

  buttonOnClick(event:BaseElementPayload){
    if(event.id === "back_to_dashboard"){
      this.__location.back();
    }
  }
}
