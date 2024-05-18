import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const pageconfig = environment.pageConfig;

@Injectable({
  providedIn: 'root'
})


export class PageService {

pageConfig: any = pageconfig;

  constructor() { }
}
