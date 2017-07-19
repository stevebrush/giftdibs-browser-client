import { Component, Input, ContentChild, OnChanges } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class AppFormGroupComponent implements OnChanges {
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

  private handleErrors(error: any) {
    error.errors.forEach((err: any, i: number) => {
      if (err.field === this.controlName.name) {
        this.controlName.control.setErrors({
          [`schemaError.${i}`]: err.message
        });
      }
    });
  }
}
