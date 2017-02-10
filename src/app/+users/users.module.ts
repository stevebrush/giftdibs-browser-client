import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent,
         UserComponent,
         DibsComponent,
         FriendsComponent } from './users-components';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [
    UserComponent,
    UsersComponent,
    DibsComponent,
    FriendsComponent,
    UserComponent
  ]
})
export class UsersModule { }
