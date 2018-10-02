import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  IconModule
} from '@app/ui/icon';

import {
  PasswordViewerComponent
} from './password-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    PasswordViewerComponent
  ],
  declarations: [
    PasswordViewerComponent
  ]
})
export class PasswordViewerModule { }
