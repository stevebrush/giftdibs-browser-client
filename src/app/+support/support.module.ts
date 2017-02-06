import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent,
         FeedbackComponent,
         PrivacyComponent,
         TermsComponent,
         SupportComponent } from './support-components';

import { SupportRoutingModule } from './support-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SupportRoutingModule
  ],
  declarations: [
    AboutComponent,
    FeedbackComponent,
    PrivacyComponent,
    TermsComponent,
    SupportComponent
  ]
})
export class SupportModule { }
