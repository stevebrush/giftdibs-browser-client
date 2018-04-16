import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    UserComponent
  ],
  providers: [
    UserService
  ]
})
export class UsersModule { }
