import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  finalize, takeUntil
} from 'rxjs/operators';

import {
  AlertService
} from '@app/ui';

import {
  User
} from '@app/shared/modules/user';

import {
  SessionService,
  SessionUser
} from '@app/shared/modules/session';

import {
  AssetsService
} from '@app/shared/modules/assets';

import {
  UserService
} from '@app/shared/modules/user';
import { Subject } from 'rxjs';

@Component({
  selector: 'gd-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, OnDestroy {
  public isReady = false;
  public isLoading = true;
  public sessionUser: SessionUser;
  public settingsForm: FormGroup;
  public errors: any[] = [];

  private ngUnsubscribe = new Subject();

  constructor(
    private alertService: AlertService,
    private assetsService: AssetsService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.createForm();
    this.updateForm();

    this.sessionService.userStream
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((user) => {
        this.sessionUser = user;
        this.changeDetector.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onSelectFile(args: any): void {
    this.assetsService.uploadAvatar(args.file).subscribe(
      (result: any) => {
        this.settingsForm.get('avatarUrl').setValue(result.data.url);
      },
      (err: any) => {
        this.alertService.error(err.error.message);
      }
    );
  }

  public onRemoveFile(): void {
    this.assetsService.removeAvatar().subscribe(
      () => {
        this.settingsForm.get('avatarUrl').reset();
      },
      (err: any) => {
        this.alertService.error(err.error.message);
      }
    );
  }

  public submit(): void {
    if (this.settingsForm.disabled) {
      return;
    }

    this.disableForm();

    const formData = this.settingsForm.value;

    this.userService.update(this.sessionService.user.id, formData)
      .pipe(
        finalize(() => {
          this.enableForm();
        })
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
        }
      );
  }

  public unlinkFacebookAccount(): void {
    if (this.settingsForm.disabled) {
      return;
    }

    this.disableForm();

    // Remove facebook id from user
    // Logout out of facebook?
    this.userService.update(this.sessionService.user.id, {
      facebookId: null
    })
      .pipe(
        finalize(() => {
          this.enableForm();
        })
      )
      .subscribe(
        () => {
          this.sessionService.patchUser({
            facebookId: null
          });
          this.alertService.success(
            'You have successfully unlinked your Facebook account.'
          );
        },
        (err: any) => {
          const error = err.error;
          this.errors = error.errors;
          this.alertService.error(error.message);
        }
      );
  }

  public onFacebookLoginSuccess(result: any): void {
    this.sessionService.patchUser({
      facebookId: result.data.authResponse.user.facebookId
    });
    this.enableForm();
  }

  public disableForm(): void {
    this.settingsForm.disable();
    this.isLoading = true;
    this.errors = [];
    this.changeDetector.markForCheck();
  }

  public enableForm(): void {
    this.isLoading = false;
    this.settingsForm.enable();
    this.changeDetector.markForCheck();
  }

  private createForm(): void {
    this.settingsForm = this.formBuilder.group({
      avatarUrl: new FormControl(),
      firstName: new FormControl(null, [
        Validators.required
      ]),
      lastName: new FormControl(null, [
        Validators.required
      ]),
      emailAddress: new FormControl(null, [
        Validators.required
      ])
      // birthday: new FormControl(null, [
      //   Validators.required
      // ])
    });

    this.disableForm();
  }

  private updateForm(): void {
    this.userService.getById(this.sessionService.user.id)
      .pipe(
        finalize(() => {
          this.isReady = true;
          this.enableForm();
        })
      )
      .subscribe(
        (user: User) => {
          this.settingsForm.reset(user);
        },
        (err: any) => {
          this.alertService.error(err.error.message);
        }
      );
  }
}
