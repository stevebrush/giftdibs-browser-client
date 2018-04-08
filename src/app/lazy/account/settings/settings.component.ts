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

import { SessionService } from '../../../modules/session/session.service';
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
  public settingsForm: FormGroup;
  public errors: any[] = [];

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private userService: UserService
  ) { }

  public ngOnInit() {
    this.createForm();
    this.updateForm();
  }

  public submit(): void {
    if (this.settingsForm.disabled) {
      return;
    }

    this.settingsForm.disable();
    this.errors = [];

    const formData = this.settingsForm.value;

    this.userService.update(this.sessionService.user._id, formData)
      .subscribe(
        (result: any) => {
          this.alertService.success(result.message, true);
          this.sessionService.patchUser(result.data.user);
          this.settingsForm.enable();
          this.changeDetector.markForCheck();
        },
        (err: any) => {
          const error = err.error;
          this.alertService.error(error.message);
          this.errors = error.errors;
          this.settingsForm.enable();
          this.changeDetector.markForCheck();
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
  }

  private updateForm() {
    this.userService
      .getById(this.sessionService.user._id)
      .subscribe((user: User) => {
        this.settingsForm.reset(user);
      });
  }
}
