import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './pages/main/main.component';
import { LoggedInGuard } from 'src/app/shared/guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'main',
        component: MainComponent,
        canActivate: [LoggedInGuard],
        data: {
          permissions : ["routes_post"]
        }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
