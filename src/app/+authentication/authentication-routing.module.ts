import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent,
         LoginComponent,
         RegisterComponent,
         ForgottenComponent } from './authentication-components';

const routes: Routes = [
  { path: '', component: AuthenticationComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
    { path: 'forgotten', component: ForgottenComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
