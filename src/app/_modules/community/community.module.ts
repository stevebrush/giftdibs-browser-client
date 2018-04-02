import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    CommunityRoutingModule
  ],
  declarations: [HomeComponent]
})
export class CommunityModule { }
