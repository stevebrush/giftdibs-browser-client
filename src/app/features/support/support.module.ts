import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';


import { SupportRoutingModule } from './support-routing.module';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SupportComponent } from './support.component';

@NgModule({
  imports: [
    CommonModule,
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
