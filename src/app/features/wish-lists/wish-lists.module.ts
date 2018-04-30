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
import { WishListPreviewComponent } from './preview/wish-list-preview.component';
import { WishListEditComponent } from './edit/wish-list-edit.component';
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
    WishListPreviewComponent
  ],
  declarations: [
    WishListCreateComponent,
    WishListPreviewComponent,
    WishListEditComponent
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
