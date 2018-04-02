import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community/community.component';

@NgModule({
  imports: [
    CommonModule,
    CommunityRoutingModule
  ],
  declarations: [
    CommunityComponent
  ],
  exports: [
    CommunityComponent
  ]
})
export class CommunityModule { }
