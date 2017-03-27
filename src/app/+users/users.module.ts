import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';

import { BucketModule,
         CardModule,
         CardComposerModule,
         MediaModule,
         RunwayModule,
         PriceTagModule } from '../shared';

import { UsersComponent,
         UserComponent,
         ProfileVisitorComponent,
         ProfileOwnerComponent,
         GiftCommentsComponent,
         GiftModalComponent } from './users-components';

@NgModule({
  imports: [
    CommonModule,
    BucketModule,
    CardModule,
    CardComposerModule,
    MediaModule,
    RunwayModule,
    PriceTagModule,
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
