import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileComponent,
         DashboardComponent,
         DibsComponent,
         FriendsComponent } from './profile-components';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent,
    DashboardComponent,
    DibsComponent,
    FriendsComponent
  ]
})
export class ProfileModule { }
