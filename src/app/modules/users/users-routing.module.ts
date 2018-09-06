import {
  NgModule
} from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import { UserComponent } from './user.component';
import { UsersComponent } from './users.component';
import { FollowersComponent } from '@app/modules/users/followers.component';
import { FollowingComponent } from '@app/modules/users/following.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UsersComponent
  },
  {
    path: ':userId',
    pathMatch: 'full',
    component: UserComponent
  },
  {
    path: ':userId/followers',
    component: FollowersComponent
  },
  {
    path: ':userId/following',
    component: FollowingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
