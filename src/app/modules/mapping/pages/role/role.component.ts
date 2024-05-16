import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TablePageSharedComponent } from 'src/app/shared/pages/table-page-shared/table-page-shared.component';
import {
  Endpoint,
  HttpMethod,
} from 'src/app/shared/services/api-call/api-call';
import { ButtonType } from 'src/assets/enums/button';
import { Color } from 'src/assets/enums/color';
import { AddUpdateRoleComponent } from '../../modal/add-update-role/add-update-role.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RoleComponent extends TablePageSharedComponent implements OnInit {

  __addButton: any = {
    id: 'submit',
    element: 'button',
    type: ButtonType.miniFab,
    icon: 'add',
  };
  
  constructor(__cDRefs: ChangeDetectorRef) {
    super(__cDRefs);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.__table.displayedColumns = ['role', 'edit', 'delete'];
    this.__table.columnData = [
      { prop: 'role', displayName: 'Role' },
      {
        prop: 'edit',
        displayName: 'Edit',
        editOption: 'button',
        icon: 'edit',
        type: 'icon',
      },
      {
        prop: 'delete',
        displayName: 'Delete',
        editOption: 'button',
        icon: 'delete',
        type: 'icon',
      },
    ];
    this.__method = HttpMethod.POST;
    this.__endpoint = Endpoint.ROLES;
    this.getTableData();
  }

  buttonOnClick(event: any) {
    this.__dialogService.openDialog(AddUpdateRoleComponent)
  }

  onResume(result: any): void {
      console.log(result)
  }
}
