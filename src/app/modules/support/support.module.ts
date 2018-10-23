import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  GridModule
} from '@giftdibs/ux';

import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SupportRoutingModule } from './support-routing.module';
import { SupportComponent } from './support.component';
import { TermsComponent } from './terms/terms.component';

@NgModule({
  imports: [
    CommonModule,
    GridModule,
    SupportRoutingModule
  ],
  declarations: [
    AboutComponent,
    FaqComponent,
    PrivacyComponent,
    TermsComponent,
    SupportComponent
  ]
})
export class SupportModule { }
