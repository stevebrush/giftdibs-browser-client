import {
  NgModule
} from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  AuthGuard
} from '@app/shared/guards';

import {
  GD_AUTHORIZATION_PROVIDERS
} from '@app/shared/modules/session';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/modules/home/home.module#HomeModule',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: 'app/modules/account/account.module#AccountModule'
  },
  {
    path: 'support',
    loadChildren: 'app/modules/support/support.module#SupportModule'
  },
  {
    path: 'users',
    loadChildren: 'app/modules/users/users.module#UsersModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'wish-lists',
    loadChildren: 'app/modules/wish-lists/wish-lists.module#WishListsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'gifts',
    loadChildren: 'app/modules/gifts/gifts.module#GiftsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'dibs',
    loadChildren: 'app/modules/dibs/dibs.module#DibsModule',
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: 'app/modules/page-not-found/page-not-found.module#PageNotFoundModule'
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
    AuthGuard,
    GD_AUTHORIZATION_PROVIDERS
  ]
})
export class AppRoutingModule { }
