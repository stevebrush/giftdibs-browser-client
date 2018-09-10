import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WelcomeModule } from '@app/modules/home/welcome';
import { CommunityModule } from '@app/modules/home/community';

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
