import { Component, Input, ContentChild, OnChanges } from '@angular/core';
import { FormControlName } from '@angular/forms';

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
    if (changes.serverErrors && !changes.serverErrors.firstChange) {
      this.handleErrors(changes.serverErrors.currentValue);
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
        this.controlName.control.setErrors({
          [`schemaError.${i}`]: err.message
        });
      }
    });
  }
}
