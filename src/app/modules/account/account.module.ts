import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { UsersComponent } from './pages/users/users.component';
import { UserRoleComponent } from './pages/user-role/user-role.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AccountComponent,
    UsersComponent,
    UserRoleComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    FlexLayoutModule
  ]
})
export class AccountModule { }
