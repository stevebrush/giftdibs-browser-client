import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CommunityComponent } from './community/community.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [CommunityComponent, WelcomeComponent, HomeComponent]
})
export class HomeModule { }
