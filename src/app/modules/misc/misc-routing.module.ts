import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiscComponent } from './misc.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PermissionDeniedComponent } from './pages/permission-denied/permission-denied.component';

const routes: Routes = [
  {
    path: '',
    component: MiscComponent,
    children: [
      {
        path: 'maintenance',
        component: MaintenanceComponent,
      },
      {
        path: 'permission-denied',
        component: PermissionDeniedComponent,
      },
      {
        path: '404',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiscRoutingModule {}
