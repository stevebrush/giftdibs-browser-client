import {
  NgModule
} from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import { FollowersComponent } from './followers.component';
import { FollowingComponent } from './following.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserComponent
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
