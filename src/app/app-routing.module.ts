import {
  NgModule
} from '@angular/core';

import {
  Routes,
  RouterModule
} from '@angular/router';

import { AuthGuard } from './_modules/session/authorization.guard';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/_modules/community/community.module#CommunityModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: 'app/_modules/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/_modules/registration/registration.module#RegistrationModule'
  },
  {
    path: 'page-not-found',
    loadChildren: 'app/_modules/page-not-found/page-not-found.module#PageNotFoundModule'
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
