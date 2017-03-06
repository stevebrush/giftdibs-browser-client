import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent, UserComponent } from './users-components';
import { UserResolver } from '../shared/user.resolver';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: ':id', component: UserComponent, resolve: { user: UserResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UsersRoutingModule { }
