import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MappingComponent } from './mapping.component';
import { RouteRoleComponent } from './route-role/route-role.component';
import { RouteComponent } from './route/route.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  {
    path: '',
    component: MappingComponent,
    children: [
      {
        path: 'route-role',
        component: RouteRoleComponent,
      },
      {
        path: 'route',
        component: RouteComponent,
      },
      {
        path: 'role',
        component: RoleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MappingRoutingModule {}
