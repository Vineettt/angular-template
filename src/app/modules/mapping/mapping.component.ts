import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from 'src/app/shared/elements/base-page/base-page.component';
import { ModuleList } from 'src/assets/enums/module-list';
import { StorageKey } from 'src/assets/enums/storage-key';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrl: './mapping.component.scss'
})
export class MappingComponent extends BasePageComponent implements OnInit {
  constructor() {
    super();
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.__storageService.setItem(StorageKey.MODULE, String(ModuleList.MAPPING));
    this.__router.navigate([
      `${this.__storageService.getItem(StorageKey.MODULE)}/route-role`,
    ]);
  }
}
