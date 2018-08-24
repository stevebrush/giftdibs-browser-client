import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { CommunityComponent } from './community/community.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [
    CommunityComponent,
    WelcomeComponent,
    HomeComponent
  ]
})
export class HomeModule { }
