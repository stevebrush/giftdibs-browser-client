import {
  NgModule
} from '@angular/core';

import {
  Routes,
  RouterModule
} from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/lazy/home/home.module#HomeModule',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: 'app/lazy/account/account.module#AccountModule'
  },
  {
    path: 'support',
    loadChildren: 'app/lazy/support/support.module#SupportModule'
  },
  {
    path: 'page-not-found',
    loadChildren: 'app/lazy/page-not-found/page-not-found.module#PageNotFoundModule'
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
