import {
  AfterContentInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnChanges
} from '@angular/core';

import {
  FormControlName,
  FormArray
} from '@angular/forms';

import {
  GDInputDirective
} from '../input';

let autoIncrementId = 0;

@Component({
  selector: 'gd-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GDFormFieldComponent implements AfterContentInit, OnChanges {
  @Input()
  public label: string;

  @Input()
  public serverErrors: any[];

  @ContentChild(GDInputDirective)
  public controlDirective: GDInputDirective;

  @ContentChild(FormControlName)
  public controlName: FormControlName;

  public uniqueIdentifier = `gd-form-field-${++autoIncrementId}`;
  public errorMessages: string[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngAfterContentInit(): void {
    this.controlDirective.elementRef.nativeElement.id = this.uniqueIdentifier;

    this.controlName.valueAccessor.registerOnTouched(() => {
      this.getErrorMessages();
    });
  }

  public ngOnChanges(changes: any): void {
    if (changes.serverErrors && changes.serverErrors.currentValue) {
      this.handleServerErrors(changes.serverErrors.currentValue);
    }
  }

  public getErrorMessages(): string[] {
    const control = this.controlName.control;

    this.errorMessages = [];

    if (!control.errors) {
      return;
    }

    Object.keys(control.errors).forEach((key: string) => {
      switch (key) {
        case 'required':
        this.errorMessages.push('This field is required.');
        break;
        case 'validation':
        this.errorMessages.push(control.errors[key]);
        break;
      }
    });

    this.changeDetector.detectChanges();
  }

  private handleServerErrors(errors: any[]) {
    errors.forEach((err: any) => {
      let field = err.field;
      const fragments = err.field.split('.');

      // Mongoose separates child fields with periods.
      // We'll need to parse out the last field to match it to what's
      // on the form.
      if (fragments.length > 0) {
        field = fragments[fragments.length - 1];
      }

      if (field === this.controlName.name) {
        const formGroup = this.controlName.control.parent;
        const formArray = formGroup.parent;

        // This form control is part of a form array.
        // Check to make sure the error from the server
        // matches the index of the form array.
        if (formArray instanceof FormArray) {
          const index = parseInt(fragments[fragments.length - 2], 10);
          if (formArray.controls[index] !== formGroup) {
            return;
          }
        }

        this.controlName.control.setErrors({
          validation: err.message
        });

        this.getErrorMessages();
      }
    });
  }
}
