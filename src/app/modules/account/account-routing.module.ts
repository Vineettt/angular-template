import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { UsersComponent } from './pages/users/users.component';
import { UserRoleComponent } from './pages/user-role/user-role.component';
import { LoggedInGuard } from 'src/app/shared/guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [LoggedInGuard],
        data: {
          permissions: ['routes_post'],
        },
      },
      {
        path: 'user-role',
        component: UserRoleComponent,
        canActivate: [LoggedInGuard],
        data: {
          permissions: ['routes_post'],
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
