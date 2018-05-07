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
  DropdownMenuItem
} from '../../../modules/dropdown-menu';

import {
  ModalService
} from '../../../modules/modal';

import {
  SessionService
} from '../../../modules/session';

import {
  User
} from '../../users';

import { WishListPrivacy } from '../wish-list-privacy';

import { WishListPrivacySelectorUsersContext } from './wish-list-privacy-selector-users-context';
import { WishListPrivacySelectorUsersComponent } from './wish-list-privacy-selector-users.component';

@Component({
  selector: 'gd-wish-list-privacy-selector',
  templateUrl: './wish-list-privacy-selector.component.html',
  styleUrls: ['./wish-list-privacy-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    /* tslint:disable-next-line:no-forward-ref */
    useExisting: forwardRef(() => WishListPrivacySelectorComponent),
    multi: true
  }]
})
export class WishListPrivacySelectorComponent
  implements OnInit, ControlValueAccessor {
  public disabled = false;
  public menuItems: DropdownMenuItem[];

  public get value(): WishListPrivacy {
    return this._value;
  }

  public set value(value: WishListPrivacy) {
    this._value = value;
    this.onChange(this.value);
    this.onTouched();
  }

  public get valueLabel(): string {
    const value = this.value;
    const found = this.menuItems.find(item => {
      return (item.custom.type === value.type);
    });
    return found.label;
  }

  @ViewChild('privacyButton')
  private privacyButton: ElementRef;
  private _value: WishListPrivacy;
  private user: User;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private modalService: ModalService,
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.user = this.sessionService.user;

    this.menuItems = [
      {
        label: 'Everyone',
        icon: 'globe',
        action: () => {
          this.value = {
            type: 'everyone'
          };
          this.changeDetector.markForCheck();
        },
        custom: {
          type: 'everyone'
        }
      },
      {
        label: 'Friends',
        icon: 'users',
        action: () => {
          this.value = {
            type: 'friends'
          };
          this.changeDetector.markForCheck();
        },
        custom: {
          type: 'friends'
        }
      },
      {
        label: 'Specific friends...',
        icon: 'user-shield',
        action: () => {
          const context = new WishListPrivacySelectorUsersContext();
          context.user = this.user;
          context.selected = this.value._allow;

          const instance = this.modalService.open(WishListPrivacySelectorUsersComponent, {
            providers: [{
              provide: WishListPrivacySelectorUsersContext,
              useValue: context
            }]
          });

          instance.componentInstance.saved.subscribe((result: { value: string[] }) => {
            this.value = {
              type: 'custom',
              _allow: result.value
            };
            this.changeDetector.markForCheck();
          });

          instance.closed.subscribe(() => {
            this.privacyButton.nativeElement.focus();
          });
        },
        custom: {
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
        custom: {
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
