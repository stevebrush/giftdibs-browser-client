import {
  NgModule
} from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SupportComponent } from './support.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {
    path: '',
    component: SupportComponent,
    children: [
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
        loadChildren: 'app/modules/support/feedback/feedback.module#FeedbackModule'
      },
      {
        path: 'privacy',
        component: PrivacyComponent
      },
      {
        path: 'terms',
        component: TermsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
