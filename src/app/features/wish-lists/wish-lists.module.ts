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
  RouterModule
} from '@angular/router';

import {
  CardModule,
  ChecklistModule,
  ConfirmModule,
  DropdownMenuModule,
  FormFieldModule,
  HideUntilModule,
  IconModule,
  ModalModule,
  RepeaterModule
} from '../../modules';

import {
  GiftsModule
} from '../gifts';

import { WishListCreateComponent } from './create/wish-list-create.component';

import { WishListEditComponent } from './edit/wish-list-edit.component';

import { WishListPreviewComponent } from './preview/wish-list-preview.component';
import { WishListPrivacySelectorUsersComponent } from './privacy-selector/privacy-selector-users.component';
import { WishListPrivacySelectorComponent } from './privacy-selector/privacy-selector.component';

import { WishListComponent } from './wish-list.component';
import { WishListService } from './wish-list.service';
import { WishListsRoutingModule } from './wish-lists-routing.module';

@NgModule({
  imports: [
    CardModule,
    ChecklistModule,
    CommonModule,
    ConfirmModule,
    DropdownMenuModule,
    FormFieldModule,
    GiftsModule,
    HideUntilModule,
    IconModule,
    ModalModule,
    ReactiveFormsModule,
    RepeaterModule,
    RouterModule,
    WishListsRoutingModule
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
    WishListPrivacySelectorUsersComponent,
    WishListComponent
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
