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
  ChecklistModule,
  DropdownMenuModule,
  IconModule,
  ModalModule
} from '@app/ui';

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
