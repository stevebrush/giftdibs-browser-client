import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent,
         UserComponent,
         ProfileComponent,
         DashboardComponent } from './users-components';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [
    UserComponent,
    UsersComponent,
    ProfileComponent,
    DashboardComponent
  ]
})
export class UsersModule { }
