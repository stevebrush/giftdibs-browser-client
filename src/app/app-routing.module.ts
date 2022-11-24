import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/shared/guards';

import { HomeComponent } from './features/home/home.component';
import { HomeModule } from './features/home/home.module';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'account',
    loadChildren: () =>
      import('src/app/features/account/account.module').then(
        (m) => m.AccountModule
      ),
  },
  {
    path: 'support',
    loadChildren: () =>
      import('src/app/features/support/support.module').then(
        (m) => m.SupportModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('src/app/features/users/users.module').then((m) => m.UsersModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('src/app/features/users/users.module').then((m) => m.UsersModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'wish-lists',
    loadChildren: () =>
      import('src/app/features/wish-lists/wish-lists.module').then(
        (m) => m.WishListsModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'dibs',
    loadChildren: () =>
      import('src/app/features/dibs/dibs.module').then((m) => m.DibsModule),
    canLoad: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('src/app/features/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [HomeModule, RouterModule.forRoot(appRoutes, {})],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
