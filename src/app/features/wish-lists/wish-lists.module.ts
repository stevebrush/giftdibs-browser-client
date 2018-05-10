import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ReactiveFormsModule
} from '@angular/forms';

import {
  CardModule
} from '../../modules/card';

import {
  ChecklistModule
} from '../../modules/checklist';

import {
  ConfirmModule
} from '../../modules/confirm';

import {
  DropdownMenuModule
} from '../../modules/dropdown-menu';

import {
  FormFieldModule
} from '../../modules/form-field';

import {
  HideUntilModule
} from '../../modules/hide-until';

import {
  IconModule
} from '../../modules/icon';

import {
  ModalModule
} from '../../modules/modal';

import { WishListCreateComponent } from './create/wish-list-create.component';
import { WishListEditComponent } from './edit/wish-list-edit.component';
import { WishListPreviewComponent } from './preview/wish-list-preview.component';
import { WishListPrivacySelectorUsersComponent } from './privacy-selector/wish-list-privacy-selector-users.component';
import { WishListPrivacySelectorComponent } from './privacy-selector/wish-list-privacy-selector.component';
import { WishListService } from './wish-list.service';

@NgModule({
  imports: [
    CardModule,
    ChecklistModule,
    CommonModule,
    ConfirmModule,
    DropdownMenuModule,
    FormFieldModule,
    HideUntilModule,
    IconModule,
    ModalModule,
    ReactiveFormsModule
  ],
  exports: [
    WishListCreateComponent,
    WishListPreviewComponent,
    WishListPrivacySelectorComponent
  ],
  declarations: [
    WishListCreateComponent,
    WishListPreviewComponent,
    WishListEditComponent,
    WishListPrivacySelectorComponent,
    WishListPrivacySelectorUsersComponent
  ],
  providers: [
    WishListService
  ],
  entryComponents: [
    WishListEditComponent,
    WishListPrivacySelectorUsersComponent
  ]
})
export class WishListsModule { }
