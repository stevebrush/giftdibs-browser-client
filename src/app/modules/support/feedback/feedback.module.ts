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
  CharacterCounterModule,
  FormFieldModule,
  WaitModule
} from '@giftdibs/ux';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { FeedbackService } from './feedback.service';

@NgModule({
  declarations: [
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    CharacterCounterModule,
    FeedbackRoutingModule,
    FormsModule,
    FormFieldModule,
    ReactiveFormsModule,
    WaitModule
  ],
  exports: [
    FeedbackComponent
  ],
  providers: [
    FeedbackService
  ]
})
export class FeedbackModule { }
