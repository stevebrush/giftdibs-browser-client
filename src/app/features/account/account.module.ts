import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AssetsModule } from '@app/shared/modules/assets';
import { UserModule } from '@app/shared/modules/user';
import {
  ChecklistModule,
  FormFieldModule,
  GridModule,
  HideUntilModule,
  ImageUploaderModule,
  NoticeModule,
  PasswordViewerModule,
  WaitModule,
} from '@giftdibs/ux';
import { IconModule } from '@giftdibs/ux';

import { AccountRoutingModule } from './account-routing.module';
import { AccountService } from './account.service';
import { DeleteComponent } from './delete/delete.component';
import { FacebookModule } from './facebook';
import { ForgottenComponent } from './forgotten/forgotten.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SettingsComponent } from './settings/settings.component';
import { VerifyAccountComponent } from './verify/verify.component';

@NgModule({
  imports: [
    AccountRoutingModule,
    AssetsModule,
    ChecklistModule,
    CommonModule,
    FacebookModule,
    FormFieldModule,
    ImageUploaderModule,
    GridModule,
    HideUntilModule,
    IconModule,
    NoticeModule,
    PasswordViewerModule,
    ReactiveFormsModule,
    UserModule,
    WaitModule,
  ],
  declarations: [
    ForgottenComponent,
    RegisterComponent,
    ResetPasswordComponent,
    VerifyAccountComponent,
    SettingsComponent,
    DeleteComponent,
  ],
  providers: [AccountService],
})
export class AccountModule {}
