import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  MessagesRoutingModule
} from './messages-routing.module';

import {
  MessagesComponent
} from './messages.component';

@NgModule({
  imports: [
    CommonModule,
    MessagesRoutingModule
  ],
  declarations: [
    MessagesComponent
  ]
})
export class MessagesModule { }
