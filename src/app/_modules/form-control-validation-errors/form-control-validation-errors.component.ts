import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-control-validation-errors',
  templateUrl: './form-control-validation-errors.component.html',
  styleUrls: ['./form-control-validation-errors.component.scss']
})
export class FormControlValidationErrorsComponent {
  @Input()
  public control: any;

  public getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
