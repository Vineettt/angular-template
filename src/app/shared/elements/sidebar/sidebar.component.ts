import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppInjector } from 'src/app/app.module';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {

  __router!: Router;

  __toggleDrawer : boolean = true;

  sidebarItems: any[] = [];

  __http!: HttpClient;

  __route!:ActivatedRoute;

  __currentUrl!:string;

  constructor(private elRef:ElementRef) {
    this.__http = AppInjector.get(HttpClient);
    this.__router = AppInjector.get(Router);
    this.__route = AppInjector.get(ActivatedRoute);
  }

  ngOnInit(): void {
    this.loadSidebarItems();
    this.__router.events.subscribe(params => {
      if(this.__currentUrl !== this.__router.url){
        this.__currentUrl = this.__router.url;
      }
    });
  }

  loadSidebarItems(): void {
    this.__http
      .get<any[]>('../../../../assets/data/sidebar.json')
      .subscribe(async (data) => {
        this.sidebarItems = data;
        this.sidebarItems = await this.updateToggleNavList(this.sidebarItems, this.__currentUrl);
        this.sideBarMargin();
      });
  }

  toggleDrawer(){
    this.__toggleDrawer = !this.__toggleDrawer;
    this.sideBarMargin();
  }

  sideBarMargin(){
    var mDContent = this.elRef.nativeElement.querySelector('mat-drawer-content');
    let mLPX = this.__toggleDrawer === true ? "185px" : "65px"
    mDContent.style.marginLeft = mLPX;
  }

  async toggleNavList(item: any){
    this.sidebarItems = await this.updateToggleNavList(this.sidebarItems, item?.route);
  }

  updateToggleNavList(sBItem: any[], route?: string){
    for (const itr of sBItem) {
      if(itr.route === route){
        itr.expand = !itr.expand;
      }
    }
    return sBItem;
  }

  triggerRouteNavigation(route:string){
    try {
      this.__router.navigate([route])
    } catch (error) {
    }
  }
}
