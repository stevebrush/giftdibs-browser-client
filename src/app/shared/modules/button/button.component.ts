import { Component, Input } from '@angular/core';

@Component({
  selector: 'gd-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input('buttonType')
  public buttonType = 'default';

  @Input('fullWidth')
  public fullWidth = false;

  public getClassName(): string {
    let classnames = `gd-button-${this.buttonType}`;
    if (this.fullWidth) {
      classnames += ' gd-button-block';
    }
    return classnames;
  }
}
