import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  OnInit,
  Output
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'gd-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    /* tslint:disable-next-line:no-forward-ref */
    useExisting: forwardRef(() => GdImageUploaderComponent),
    multi: true
  }]
})
export class GdImageUploaderComponent implements OnInit, ControlValueAccessor {
  public get value(): string {
    return this._value;
  }

  public set value(value: string) {
    this._value = value;
  }

  public disabled = false;
  public imageSource: string;

  @Output()
  public selectFile = new EventEmitter<any>();

  private _value: string;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
  }

  public onFileSelected(event: any): void {
    const file = event.target.files[0];
    // const reader = new FileReader();

    // reader.onload = (fileEvent: any) => {
    //   this.imageSource = fileEvent.target.result;
    //   this.changeDetector.markForCheck();
    // };

    // reader.readAsDataURL(file);

    this.selectFile.next({ file });
  }

  public writeValue(value: any): void {
    console.log('writeValue:', value);
    this.value = value;
  }

  // Angular automatically constructs these methods.
  public onChange = (value: any) => {};
  public onTouched = () => {};

  public registerOnChange(fn: (value: any) => void): void {
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
