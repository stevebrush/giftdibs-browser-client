import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent,
         UserComponent,
         DibsComponent,
         FriendsComponent,
         ProfileComponent } from './users-components';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: ':id', component: UserComponent,
    children: [
      { path: '', component: ProfileComponent },
      { path: 'dibs', component: DibsComponent },
      { path: 'friends', component: FriendsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UsersRoutingModule { }
