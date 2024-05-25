import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscRoutingModule } from './misc-routing.module';
import { MiscComponent } from './misc.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PermissionDeniedComponent } from './pages/permission-denied/permission-denied.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MiscComponent,
    MaintenanceComponent,
    NotFoundComponent,
    PermissionDeniedComponent
  ],
  imports: [
    CommonModule,
    MiscRoutingModule,
    SharedModule,
    FlexLayoutModule
  ]
})
export class MiscModule { }
