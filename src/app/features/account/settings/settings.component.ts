import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  // concatMap,
  finalize
} from 'rxjs/operators';

import {
  AlertService
} from '../../../modules';

import {
  AssetsService
} from '../../assets';

import {
  SessionService
} from '../session';

import {
  User
} from '../../users/user';

import {
  UserService
} from '../../users/user.service';

@Component({
  selector: 'gd-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [UserService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  public isReady = false;
  public isLoading = true;
  public settingsForm: FormGroup;
  public errors: any[] = [];

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

    this.settingsForm.disable();
    this.isLoading = true;
    this.errors = [];
    this.changeDetector.markForCheck();

    const formData = this.settingsForm.value;

    this.userService.update(this.sessionService.user.id, formData)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.settingsForm.enable();
          this.changeDetector.markForCheck();
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
    });
    this.settingsForm.disable();
  }

  private updateForm(): void {
    this.userService.getById(this.sessionService.user.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.isReady = true;
          this.settingsForm.enable();
          this.changeDetector.markForCheck();
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
