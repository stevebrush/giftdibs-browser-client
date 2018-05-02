import {
  Component,
  forwardRef,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import { WishListPrivacy } from '../wish-list-privacy';

let nextUniqueId = 0;

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
  public name = `gdWishListPrivacySelectorName${nextUniqueId++}`;

  public get value(): WishListPrivacy {
    return this._value;
  }

  public set value(value: WishListPrivacy) {
    this._value = value;
    console.log('set value()', this._value);
    this.onChange(this.value);
    this.onTouched();
  }

  private _value: WishListPrivacy;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit(): void { }

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
