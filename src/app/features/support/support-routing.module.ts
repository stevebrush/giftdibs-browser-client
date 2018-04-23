import {
  NgModule
} from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { SupportComponent } from './support.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SupportComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
