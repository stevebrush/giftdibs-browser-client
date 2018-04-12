import {
  NgModule
} from '@angular/core';

import {
  Routes,
  RouterModule
} from '@angular/router';

import { AuthGuard } from './modules/session/authorization.guard';

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
    path: 'users',
    loadChildren: 'app/lazy/users/users.module#UsersModule',
    canLoad: [AuthGuard]
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
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
