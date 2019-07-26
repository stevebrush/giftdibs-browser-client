import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import {
  DropdownMenuItem,
  ModalClosedEventArgs,
  ModalService
} from '@giftdibs/ux';

import {
  SessionService
} from '@giftdibs/session';

import {
  User
} from '../user';

import {
  WishListPrivacy
} from '../wish-list';

import {
  PrivacySelectorUsersContext
} from './privacy-selector-users-context';

import {
  PrivacySelectorUsersComponent
} from './privacy-selector-users.component';

@Component({
  selector: 'gd-privacy-selector',
  templateUrl: './privacy-selector.component.html',
  styleUrls: ['./privacy-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    /* tslint:disable-next-line:no-forward-ref */
    useExisting: forwardRef(() => PrivacySelectorComponent),
    multi: true
  }]
})
export class PrivacySelectorComponent
  implements OnInit, ControlValueAccessor {
  public disabled = false;
  public menuItems: DropdownMenuItem[];

  public get value(): WishListPrivacy {
    return this._value || {
      type: 'everyone'
    };
  }

  public set value(value: WishListPrivacy) {
    this._value = value;
    this.onChange(this.value);
    this.onTouched();
  }

  public get valueLabel(): string {
    const value = this.value;
    const found = this.menuItems.find(item => {
      return (item.data.type === value.type);
    });
    return found.label;
  }

  @ViewChild('privacyButton', { static: true })
  private privacyButton: ElementRef;

  private user: User;

  private _value: WishListPrivacy;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private modalService: ModalService,
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.user = this.sessionService.user;

    this.menuItems = [
      {
        label: 'Community',
        icon: 'users',
        action: () => {
          this.value = {
            type: 'everyone'
          };
          this.changeDetector.markForCheck();
        },
        data: {
          type: 'everyone'
        }
      },
      {
        label: 'Specific friends...',
        icon: 'user-shield',
        action: () => {
          const context = new PrivacySelectorUsersContext();
          context.user = this.user;
          context.selected = this.value.allowedUserIds;

          const instance = this.modalService.open(
            PrivacySelectorUsersComponent,
            {
              providers: [{
                provide: PrivacySelectorUsersContext,
                useValue: context
              }]
            }
          );

          instance.closed.subscribe((args: ModalClosedEventArgs) => {
            if (args.reason === 'save') {
              this.value = {
                type: 'custom',
                allowedUserIds: args.data.value
              };
              this.changeDetector.markForCheck();
            }

            this.privacyButton.nativeElement.focus();
          });
        },
        data: {
          type: 'custom'
        }
      },
      {
        label: 'Only you',
        icon: 'eye-slash',
        action: () => {
          this.value = {
            type: 'me'
          };
          this.changeDetector.markForCheck();
        },
        data: {
          type: 'me'
        }
      }
    ];
  }

  public writeValue(value: WishListPrivacy): void {
    this.value = value;
  }

  public onRadioChange(event: any): void {
    this.value.type = event.target.value;
  }

  // Angular automatically constructs these methods.
  public onChange = (value: WishListPrivacy) => {};
  public onTouched = () => {};

  public registerOnChange(fn: (value: WishListPrivacy) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetector.markForCheck();
  }
}
