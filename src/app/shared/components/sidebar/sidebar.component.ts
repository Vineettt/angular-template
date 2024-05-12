import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { AppInjector } from 'src/app/app.module';
import { sideBarList } from 'src/assets/data/sidebar';
import { AppLoadService } from '../../services/app-load/app-load.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  __router!: Router;

  __toggleDrawer: boolean = true;

  sidebarItems: any[] = [];

  __http!: HttpClient;

  __currentUrl!: string;

  __appLoadService!: AppLoadService;

  constructor(private elRef: ElementRef) {
    this.__http = AppInjector.get(HttpClient);
    this.__router = AppInjector.get(Router);
    this.__appLoadService = AppInjector.get(AppLoadService);
    this.__router.events.subscribe(async (params) => {
      if (this.__currentUrl !== this.__router.url) {
        this.__currentUrl = this.__router.url;
      }
    });
  }

  async ngOnInit() {
    this.sidebarItems = sideBarList;
    this.__currentUrl = this.__router.url;
    if (this.__appLoadService?.initUpdateSideBar) {
      this.__appLoadService.initUpdateSideBar = false;
      this.sidebarItems = await this.updateToggleNavList(
        this.sidebarItems,
        this.__currentUrl
      );
    }
  }

  toggleDrawer() {
    this.__toggleDrawer = !this.__toggleDrawer;
    this.sideBarMargin();
  }

  sideBarMargin() {
    var mDContent =
      this.elRef.nativeElement.querySelector('mat-drawer-content');
    let mLPX = this.__toggleDrawer === true ? '185px' : '65px';
    mDContent.style.marginLeft = mLPX;
  }

  async toggleNavList(item: any) {
    this.sidebarItems = await this.updateToggleNavList(
      this.sidebarItems,
      item?.route
    );
  }

  async updateToggleNavList(sBItem: any[], route?: string) {
    for (const itr of sBItem) {
      let existFlag = await this.checkChildRouteExist(itr?.childItems, route);
      if (itr.route === route) {
        itr.expand = !itr.expand;
      }
      if (itr.route !== route) {
        itr.expand = false;
      }
      if (existFlag) {
        itr.expand = true;
      }
    }
    return sBItem;
  }

  checkChildRouteExist(sBItem: any, route?: string) {
    if (sBItem === undefined) {
      return false;
    }
    let findIndex = sBItem.findIndex((el: any) => {
      return el?.route === route;
    });
    if (findIndex === -1) {
      return false;
    }
    return true;
  }

  triggerRouteNavigation(route: string) {
    try {
      this.__router.navigate([route]);
    } catch (error) {}
  }
}
