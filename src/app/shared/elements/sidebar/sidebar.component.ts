import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { AppInjector } from 'src/app/app.module';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent extends BasePageComponent implements OnInit {

  __toggleDrawer : boolean = true;

  sidebarItems: any[] = [];

  __http!: HttpClient;

  constructor(private elRef:ElementRef) {
    super();
    this.__http = AppInjector.get(HttpClient);
  }

  ngOnInit(): void {
    this.loadSidebarItems();
  }

  loadSidebarItems(): void {
    this.__http
      .get<any[]>('../../../../assets/data/menu.json')
      .subscribe((data) => {
        this.sidebarItems = data;
      });
  }

  toggleDrawer(){
    var mDContent = this.elRef.nativeElement.querySelector('mat-drawer-content');
    this.__toggleDrawer = !this.__toggleDrawer;
    let mLPX = this.__toggleDrawer === true ? "185px" : "65px"
    mDContent.style.marginLeft = mLPX
  }
}
