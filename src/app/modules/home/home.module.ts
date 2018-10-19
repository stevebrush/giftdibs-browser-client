import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  CommunityModule
} from '@app/modules/home/community';

import {
  WelcomeModule
} from '@app/modules/home/welcome';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    CommunityModule,
    HomeRoutingModule,
    WelcomeModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
