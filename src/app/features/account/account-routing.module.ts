import {
  NgModule
} from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import { AuthGuard } from '../../modules/session/authorization.guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgottenComponent } from './forgotten/forgotten.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyAccountComponent } from './verify/verify.component';
import { SettingsComponent } from './settings/settings.component';
import { DeleteComponent } from './delete/delete.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgotten',
    component: ForgottenComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'reset-password/:resetPasswordToken',
    component: ResetPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'verify/:emailAddressVerificationToken',
    component: VerifyAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'verify',
    component: VerifyAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'delete',
    component: DeleteComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AccountRoutingModule { }
