import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';
import { AppInjector } from 'src/app/app.module';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent extends BasePageComponent implements OnInit {

  sidebarItems: any[] = []; 

  __http !: HttpClient;

  constructor() {
    super();
    this.__http = AppInjector.get(HttpClient);
  }

  ngOnInit(): void {
    this.loadSidebarItems();
  }

  loadSidebarItems(): void {
    this.__http.get<any[]>('../../../../assets/data/menu.json').subscribe(
      (data) => {
        this.sidebarItems = data;
        
      },
    );
  }

}
