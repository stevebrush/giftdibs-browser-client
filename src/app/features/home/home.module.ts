import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommunityModule } from 'src/app/features/home/community';
import { WelcomeModule } from 'src/app/features/home/welcome';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, CommunityModule, HomeRoutingModule, WelcomeModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
