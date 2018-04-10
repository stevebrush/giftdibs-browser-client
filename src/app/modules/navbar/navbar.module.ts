import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  RouterModule
} from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { SearchModule } from '../search/search.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SearchModule
  ],
  exports: [NavbarComponent],
  declarations: [NavbarComponent]
})
export class NavbarModule { }
