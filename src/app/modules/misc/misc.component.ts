import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from 'src/app/shared/elements/base-page/base-page.component';
import { ModuleList } from 'src/assets/enums/module-list';
import { StorageKey } from 'src/assets/enums/storage-key';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrl: './misc.component.scss'
})
export class MiscComponent extends BasePageComponent implements OnInit {

  constructor() {
    super();
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.__storageService.setItem(StorageKey.MODULE, String(ModuleList.SERVER));
  }
}