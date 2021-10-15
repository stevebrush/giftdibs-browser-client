import {
  NgModule
} from '@angular/core';

import {
  PreloadAllModules,
  RouterModule,
  Routes
} from '@angular/router';

import {
  AuthGuard
} from '@app/shared/guards';

import { HomeComponent } from './features/home/home.component';
import { HomeModule } from './features/home/home.module';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'account',
    loadChildren: () => import('app/features/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'support',
    loadChildren: () => import('app/features/support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'users',
    loadChildren: () => import('app/features/users/users.module').then(m => m.UsersModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('app/features/users/users.module').then(m => m.UsersModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'wish-lists',
    loadChildren: () => import('app/features/wish-lists/wish-lists.module').then(m => m.WishListsModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'dibs',
    loadChildren: () => import('app/features/dibs/dibs.module').then(m => m.DibsModule),
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('app/features/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }
];

@NgModule({
  imports: [
    HomeModule,
    RouterModule.forRoot(appRoutes, {
    relativeLinkResolution: 'legacy'
})
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
