import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent,
         SupportComponent,
         FeedbackComponent,
         PrivacyComponent,
         TermsComponent } from './support-components';

const routes: Routes = [
  { path: '', component: SupportComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: '/support/about' },
    { path: 'about', component: AboutComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'terms', component: TermsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
