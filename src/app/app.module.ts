import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListService, UserService } from './shared/services';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'auth', loadChildren: './+authentication/authentication.module.ts#AuthenticationModule' },
  { path: 'lists', loadChildren: './+lists/lists.module.ts#ListsModule' },
  { path: 'settings', loadChildren: './+settings/settings.module.ts#SettingsModule' },
  { path: 'support', loadChildren: './+support/support.module.ts#SupportModule' },
  { path: 'users', loadChildren: './+users/users.module.ts#UsersModule' },
  { path: '404', component: PageNotFoundComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  providers: [
    ListService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
