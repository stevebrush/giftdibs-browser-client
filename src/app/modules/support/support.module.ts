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
  FormFieldModule,
  GridModule
} from '@app/ui';

import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SupportRoutingModule } from './support-routing.module';
import { SupportComponent } from './support.component';
import { TermsComponent } from './terms/terms.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormFieldModule,
    GridModule,
    ReactiveFormsModule,
    SupportRoutingModule
  ],
  declarations: [
    AboutComponent,
    FaqComponent,
    PrivacyComponent,
    TermsComponent,
    FeedbackComponent,
    SupportComponent
  ]
})
export class SupportModule { }
