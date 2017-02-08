import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent,
         DashboardComponent,
         DibsComponent } from './profile-components';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: ':id', component: ProfileComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dibs', component: DibsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProfileRoutingModule { }
