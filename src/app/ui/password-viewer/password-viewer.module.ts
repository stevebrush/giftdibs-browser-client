import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { PasswordViewerComponent } from './password-viewer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    PasswordViewerComponent
  ],
  declarations: [
    PasswordViewerComponent
  ]
})
export class PasswordViewerModule { }
