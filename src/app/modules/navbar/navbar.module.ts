import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule
} from '@angular/router';

import { DropdownMenuModule } from '../dropdown-menu/dropdown-menu.module';
import { SearchModule } from '../search/search.module';
import { UserThumbnailModule } from '../user-thumbnail/user-thumbnail.module';

import { NavbarComponent } from './navbar.component';

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
