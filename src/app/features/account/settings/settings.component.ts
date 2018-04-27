import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import 'rxjs/add/operator/finally';

import {
  SessionService
} from '../../../modules/session';

import { UserService } from '../../users/user.service';
import { User } from '../../users/user';

import { AlertService } from '../../../modules/alert/alert.service';

@Component({
  selector: 'gd-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [UserService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  public isLoading = true;
  public settingsForm: FormGroup;
  public errors: any[] = [];

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.createForm();
    this.updateForm();
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

    this.userService
      .update(this.sessionService.user._id, formData)
      .finally(() => {
        this.isLoading = false;
        this.settingsForm.enable();
        this.changeDetector.markForCheck();
      })
      .subscribe(
        (result: any) => {
          this.alertService.success(result.message);
          this.sessionService.patchUser(result.data.user);
        },
        (err: any) => {
          const error = err.error;
          this.alertService.error(error.message);
          this.errors = error.errors;
        }
      );
  }

  private createForm(): void {
    this.settingsForm = this.formBuilder.group({
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
    this.userService
      .getById(this.sessionService.user._id)
      .finally(() => {
        this.isLoading = false;
        this.settingsForm.enable();
        this.changeDetector.markForCheck();
      })
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
