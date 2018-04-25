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

import { WishListCreateComponent } from './create/wish-list-create.component';
import { WishListService } from './wish-list.service';
import { WishListPreviewComponent } from './preview/wish-list-preview.component';
import { CardModule } from '../../modules/card/card.module';

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    FormFieldModule,
    ReactiveFormsModule
  ],
  exports: [
    WishListCreateComponent,
    WishListPreviewComponent
  ],
  declarations: [
    WishListCreateComponent,
    WishListPreviewComponent
  ],
  providers: [
    WishListService,
    GD_AUTHORIZATION_PROVIDERS
  ]
})
export class WishListsModule { }
