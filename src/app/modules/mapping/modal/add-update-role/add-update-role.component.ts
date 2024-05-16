import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BasePageComponent } from 'src/app/shared/elements/base-page/base-page.component';

@Component({
  selector: 'app-add-update-role',
  templateUrl: './add-update-role.component.html',
  styleUrl: './add-update-role.component.scss'
})
export class AddUpdateRoleComponent  extends BasePageComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private __dialogRef: MatDialogRef<AddUpdateRoleComponent>,
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  
  buttonClicked(event: Event): void {
    this.__dialogService.closeDialog({
      data: {
        id: "test"
      },
    });
  }
}
