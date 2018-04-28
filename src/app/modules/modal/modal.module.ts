import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FocusTrapModule
} from '../focus-trap';

import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalHeadingComponent } from './modal-heading.component';
import { ModalBodyComponent } from './modal-body.component';
import { ModalFooterComponent } from './modal-footer.component';

@NgModule({
  imports: [
    CommonModule,
    FocusTrapModule
  ],
  exports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalHeadingComponent,
    ModalBodyComponent,
    ModalFooterComponent
  ],
  declarations: [
    ModalComponent,
    ModalHeaderComponent,
    ModalHeadingComponent,
    ModalBodyComponent,
    ModalFooterComponent
  ],
  providers: [
    ModalService
  ]
})
export class ModalModule { }
