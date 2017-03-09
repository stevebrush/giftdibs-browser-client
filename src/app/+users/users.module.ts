import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent,
         UserComponent,
         ProfileVisitorComponent,
         ProfileOwnerComponent } from './users-components';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [
    UserComponent,
    UsersComponent,
    ProfileVisitorComponent,
    ProfileOwnerComponent
  ]
})
export class UsersModule { }
