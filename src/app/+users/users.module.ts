import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent,
         UserComponent,
         ProfileVisitorComponent,
         ProfileOwnerComponent,
         GiftCommentsComponent,
         GiftModalComponent } from './users-components';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [
    UserComponent,
    UsersComponent,
    ProfileVisitorComponent,
    ProfileOwnerComponent,
    GiftCommentsComponent,
    GiftModalComponent
  ]
})
export class UsersModule { }
