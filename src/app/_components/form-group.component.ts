import { Component, Input, ContentChild, OnChanges } from '@angular/core';
import { FormControlName, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnChanges {
  @Input()
  public label: string;

  @Input()
  public serverErrors: any[];

  @ContentChild(FormControlName)
  public controlName: FormControlName;

  public ngOnChanges(changes: any): void {
    if (changes.serverErrors && changes.serverErrors.currentValue !== undefined) {
      setTimeout(() => {
        console.log('eh?', changes.serverErrors.currentValue);
        this.handleErrors(changes.serverErrors.currentValue);
      });
    }
  }

  public getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  private handleErrors(errors: any[]) {
    errors.forEach((err: any, i: number) => {
      let field = err.field;
      const fragments = err.field.split('.');

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
          [`schemaError.${i}`]: err.message
        });
      }
    });
  }
}
