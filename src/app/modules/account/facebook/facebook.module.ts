import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  IconModule
} from '@app/ui';

import {
  FacebookLoginButtonComponent
} from './facebook-login-button';

@NgModule({
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    FacebookLoginButtonComponent
  ],
  declarations: [
    FacebookLoginButtonComponent
  ]
})
export class FacebookModule { }
