import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AlertService } from '../alert/alert.service';
import { toDataUrl } from '../utils/to-data-url';

import { ImageUploaderOrientation } from './image-uploader-orientation';

let uniqueId = 0;

@Component({
  selector: 'gd-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      /* tslint:disable-next-line:no-forward-ref */
      useExisting: forwardRef(() => ImageUploaderComponent),
      multi: true,
    },
  ],
})
export class ImageUploaderComponent implements OnDestroy, ControlValueAccessor {
  @Input()
  public allowUrl = true;

  @Input()
  public orientation: `${ImageUploaderOrientation}` =
    ImageUploaderOrientation.Horizontal;

  public get value(): string {
    return this._value;
  }

  public set value(value: string) {
    this._value = value;
  }

  public disabled = false;

  public imageSource: string = '';

  @Output()
  public selectFile = new EventEmitter<{ file: any }>();

  @Output()
  public removeFile = new EventEmitter<void>();

  @ViewChild('fileInput')
  public fileInput: ElementRef | undefined;

  @ViewChild('fileUrlInput')
  public fileUrlInput: ElementRef | undefined;

  protected showUrlField = false;
  protected fileUrlId = `file-url-input-${++uniqueId}-${Date.now()}`;

  private _value: string = '';

  constructor(
    private changeDetector: ChangeDetectorRef,
    private alertSvc: AlertService
  ) {}

  public ngOnDestroy(): void {
    this.selectFile.complete();
    this.removeFile.complete();
  }

  public async onFileUrlChange(evt: any): Promise<void> {
    if (evt.target.value) {
      try {
        const imageDataUrl = await toDataUrl(evt.target.value);
        this.value = imageDataUrl.toString();
        this.imageSource = this.value;
      } catch (err) {
        this.value = '';
        this.imageSource = '';
        this.alertSvc.error(
          'The URL provided is not a valid image resource.',
          false
        );
      }
    } else if (!this.imageSource) {
      this.value = '';
      this.imageSource = '';
    }

    this.onChange(this.value);
    this.changeDetector.markForCheck();
  }

  public triggerFileSelect(): void {
    if (this.fileInput) {
      const input = this.fileInput.nativeElement;
      input.value = '';
      input.click();
    }
  }

  public triggerUrlSelect(): void {
    this.showUrlField = true;
  }

  public onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectFile.next({ file });
  }

  public writeValue(value: any): void {
    this.imageSource = value;
    this.value = value;
    this.changeDetector.markForCheck();
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

  public clearSelection(): void {
    this.removeFile.next();

    if (this.fileUrlInput) {
      this.showUrlField = false;
      this.fileUrlInput.nativeElement.value = '';
    }
  }
}
