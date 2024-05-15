import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MappingRoutingModule } from './mapping-routing.module';
import { MappingComponent } from './mapping.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouteRoleComponent } from './pages/route-role/route-role.component';
import { RouteComponent } from './pages/route/route.component';
import { RoleComponent } from './pages/role/role.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    MappingComponent,
    RouteRoleComponent,
    RouteComponent,
    RoleComponent
  ],
  imports: [
    CommonModule,
    MappingRoutingModule,
    SharedModule,
    FlexLayoutModule
  ]
})
export class MappingModule { }
