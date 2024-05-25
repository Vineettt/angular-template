import { Component, OnInit } from '@angular/core';
import { AppInjector } from 'src/app/app.module';
import { AppLoadService } from '../../services/app-load/app-load.service';
import { BaseElementPayload } from '../../elements/base-element/base-element';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  implements OnInit {

  __itemsList: any = [{
    id: "logout",
    element: "button",
    label: "logout",
    icon: "logout",
    type: "item"
  }];

  __appLoadService!: AppLoadService;

  __router!:Router;

  constructor() {
    this.__appLoadService = AppInjector.get(AppLoadService);
    this.__router = AppInjector.get(Router);
  }

  ngOnInit(): void {
  }

  buttonOnClick(event:BaseElementPayload){
    if(event.icon === "logout"){
      this.__appLoadService.logout();
      this.__router.navigate(['/']);
    }
  }
}
