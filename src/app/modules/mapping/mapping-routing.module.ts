import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MappingComponent } from './mapping.component';
import { RouteRoleComponent } from './pages/route-role/route-role.component';
import { RouteComponent } from './pages/route/route.component';
import { RoleComponent } from './pages/role/role.component';
import { LoggedInGuard } from 'src/app/shared/guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: MappingComponent,
    children: [
      {
        path: 'route-role',
        component: RouteRoleComponent,
        canActivate: [LoggedInGuard],
        data: {
          permissions: ['role_route_mappings_post'],
        },
      },
      {
        path: 'route',
        component: RouteComponent,
        canActivate: [LoggedInGuard],
        data: {
          permissions: ['routes_post'],
        },
      },
      {
        path: 'role',
        component: RoleComponent,
        canActivate: [LoggedInGuard],
        data: {
          permissions: ['roles_post'],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MappingRoutingModule {}
