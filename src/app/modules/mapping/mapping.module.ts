import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MappingRoutingModule } from './mapping-routing.module';
import { MappingComponent } from './mapping.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouteRoleComponent } from './pages/route-role/route-role.component';
import { RouteComponent } from './pages/route/route.component';
import { RoleComponent } from './pages/role/role.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddUpdateRoleComponent } from './modal/add-update-role/add-update-role.component';
import { UpdateRouteComponent } from './modal/update-route/update-route.component';
import { ModifyRoleRouteMappingComponent } from './modal/modify-role-route-mapping/modify-role-route-mapping.component';


@NgModule({
  declarations: [
    MappingComponent,
    RouteRoleComponent,
    RouteComponent,
    RoleComponent,
    AddUpdateRoleComponent,
    UpdateRouteComponent,
    ModifyRoleRouteMappingComponent
  ],
  imports: [
    CommonModule,
    MappingRoutingModule,
    SharedModule,
    FlexLayoutModule
  ]
})
export class MappingModule { }
