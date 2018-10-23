import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  IconModule
} from '@giftdibs/ux';

import {
  ChecklistModule,
  DropdownMenuModule,
  ModalModule
} from '@giftdibs/ux';

import {
  PrivacySelectorComponent
} from './privacy-selector.component';

import {
  PrivacySelectorUsersComponent
} from './privacy-selector-users.component';

@NgModule({
  imports: [
    ChecklistModule,
    CommonModule,
    DropdownMenuModule,
    FormsModule,
    IconModule,
    ModalModule,
    ReactiveFormsModule
  ],
  declarations: [
    PrivacySelectorComponent,
    PrivacySelectorUsersComponent
  ],
  exports: [
    PrivacySelectorComponent
  ],
  entryComponents: [
    PrivacySelectorUsersComponent
  ]
})
export class PrivacySelectorModule {}
