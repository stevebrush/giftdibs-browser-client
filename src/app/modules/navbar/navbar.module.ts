import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule
} from '@angular/router';

import { SearchModule } from '../search/search.module';

import { NavbarComponent } from './navbar.component';
import { DropdownMenuModule } from '../dropdown-menu/dropdown-menu.module';
import { UserThumbnailModule } from '../user-thumbnail/user-thumbnail.module';

@NgModule({
  imports: [
    CommonModule,
    DropdownMenuModule,
    RouterModule,
    SearchModule,
    UserThumbnailModule
  ],
  exports: [
    NavbarComponent
  ],
  declarations: [
    NavbarComponent
  ]
})
export class NavbarModule { }
