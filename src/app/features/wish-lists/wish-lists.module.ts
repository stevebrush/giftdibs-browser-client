import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ReactiveFormsModule
} from '@angular/forms';

import { FormFieldModule } from '../../modules/form-field/form-field.module';

import {
  GD_AUTHORIZATION_PROVIDERS
} from '../../modules/session';

import {
  CardModule
} from '../../modules/card';

import {
  ConfirmModule
} from '../../modules/confirm';

import {
  DropdownMenuModule
} from '../../modules/dropdown-menu';

import {
  ModalModule
} from '../../modules/modal';

import { WishListCreateComponent } from './create/wish-list-create.component';
import { WishListEditComponent } from './edit/wish-list-edit.component';
import { WishListPreviewComponent } from './preview/wish-list-preview.component';
import { WishListPrivacySelectorComponent } from './privacy-selector/wish-list-privacy-selector.component';
import { WishListService } from './wish-list.service';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    ConfirmModule,
    DropdownMenuModule,
    FormFieldModule,
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
    WishListPrivacySelectorComponent
  ],
  providers: [
    WishListService,
    GD_AUTHORIZATION_PROVIDERS
  ],
  entryComponents: [
    WishListEditComponent
  ]
})
export class WishListsModule { }
