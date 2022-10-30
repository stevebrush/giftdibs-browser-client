import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SessionService, SessionUser } from '@giftdibs/session';
import { AlertService, ChecklistChoice } from '@giftdibs/ux';

import { finalize } from 'rxjs/operators';
import { AssetsService } from 'src/app/shared/modules/assets';
import { NotificationType } from 'src/app/shared/modules/notifications';
import { User } from 'src/app/shared/modules/user';
import { UserService } from 'src/app/shared/modules/user';

@Component({
  selector: 'gd-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  public notificationChoices: ChecklistChoice[];

  public isReady = false;
  public isLoading = true;
  public sessionUser: SessionUser;
  public settingsForm: UntypedFormGroup;
  public errors: any[] = [];

  constructor(
    private alertService: AlertService,
    private assetsService: AssetsService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: UntypedFormBuilder,
    private sessionService: SessionService,
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.createForm();
    this.updateForm();
  }

  public onSelectFile(args: any): void {
    this.assetsService.uploadAvatar(args.file).subscribe(
      (result: any) => {
        this.settingsForm.get('avatarUrl').setValue(result.data.url);
      },
      (err: any) => {
        this.alertService.error(err.error.message);
      },
    );
  }

  public onRemoveFile(): void {
    this.assetsService.removeAvatar().subscribe(
      () => {
        this.settingsForm.get('avatarUrl').reset();
      },
      (err: any) => {
        this.alertService.error(err.error.message);
      },
    );
  }

  public submit(): void {
    if (this.settingsForm.disabled) {
      return;
    }

    this.disableForm();
    const formData = this.settingsForm.value;
    const currentSettings = this.sessionUser.notificationSettings;

    // Parse form data into something the API can use.
    const emailNotify: NotificationType[] = [];
    Object.keys(currentSettings).forEach((key: NotificationType) => {
      const allowEmail = formData.emailSettings.indexOf(key) > -1;
      if (allowEmail) {
        emailNotify.push(key);
      }
    });

    formData.emailNotify = emailNotify;
    delete formData.emailSettings;

    this.userService
      .update(this.sessionService.user.id, formData)
      .pipe(
        finalize(() => {
          this.enableForm();
        }),
      )
      .subscribe(
        (result: any) => {
          this.updateForm();
          this.sessionService.patchUser(this.settingsForm.value);
          this.alertService.success(result.message);
        },
        (err: any) => {
          const error = err.error;
          this.errors = error.errors;
          this.alertService.error(error.message);
        },
      );
  }

  public unlinkFacebookAccount(): void {
    if (this.settingsForm.disabled) {
      return;
    }

    this.disableForm();

    // Remove facebook id from user
    // Logout out of facebook?
    this.userService
      .update(this.sessionService.user.id, {
        facebookId: null,
      })
      .pipe(
        finalize(() => {
          this.enableForm();
        }),
      )
      .subscribe(
        () => {
          this.sessionService.patchUser({
            facebookId: null,
          });
          this.alertService.success(
            'You have successfully unlinked your Facebook account.',
          );
        },
        (err: any) => {
          const error = err.error;
          this.errors = error.errors;
          this.alertService.error(error.message);
        },
      );
  }

  public onFacebookLoginSuccess(result: any): void {
    this.sessionService.patchUser({
      facebookId: result.data.authResponse.user.facebookId,
    });
    this.enableForm();
  }

  public disableForm(): void {
    this.settingsForm.disable();
    this.isLoading = true;
    this.errors = [];
    this.changeDetector.markForCheck();
  }

  private enableForm(): void {
    this.isLoading = false;
    this.settingsForm.enable();
    this.changeDetector.markForCheck();
  }

  private createForm(): void {
    this.settingsForm = this.formBuilder.group({
      avatarUrl: new UntypedFormControl(),
      firstName: new UntypedFormControl(null, [Validators.required]),
      lastName: new UntypedFormControl(null, [Validators.required]),
      emailAddress: new UntypedFormControl(null, [Validators.required]),
      emailSettings: new UntypedFormControl([]),
    });

    this.disableForm();
  }

  private updateForm(): void {
    this.userService
      .getById(this.sessionService.user.id)
      .pipe(
        finalize(() => {
          this.isReady = true;
          this.enableForm();
        }),
      )
      .subscribe(
        (user: User) => {
          this.sessionUser = user;

          // Parse the response into something the form can use.
          const notificationSettings = user.notificationSettings;
          this.notificationChoices = Object.keys(notificationSettings)
            .map((key: NotificationType) => {
              const description = this.getNotificationDescription(key);
              return {
                value: key,
                label: description,
              };
            })
            .filter((choice: any) => {
              return choice.label;
            });

          const formData: any = {
            avatarUrl: user.avatarUrl,
            facebookId: user.facebookId,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
          };

          formData.emailSettings = Object.keys(notificationSettings).filter(
            (key) => {
              return notificationSettings[key].allowEmail === true;
            },
          );

          this.settingsForm.reset(formData);
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        },
      );
  }

  private getNotificationDescription(key: NotificationType): string {
    let description: string;

    switch (key) {
      case NotificationType.GiftComment:
        description = 'Someone comments on an item in your wish list';
        break;
      case NotificationType.GiftCommentAlso:
        description = 'Someone comments on a gift that you also commented';
        break;
      case NotificationType.GiftDelivered:
        description = 'Someone marks an item in your wish list as delivered';
        break;
      case NotificationType.GiftReceived:
        description = 'Someone marks a gift you dibbed as received';
        break;
      case NotificationType.FriendshipNew:
        description = 'Someone follows you';
        break;
    }

    return description;
  }
}
