import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'gd-password-viewer',
  templateUrl: './password-viewer.component.html',
  styleUrls: ['./password-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordViewerComponent {
  @Input()
  public inputElement: HTMLInputElement;

  @Input()
  public disabled = false;

  public isTypePassword = true;

  public togglePasswordInputType() {
    if (this.inputElement.type === 'text') {
      this.inputElement.type = 'password';
      this.isTypePassword = true;
    } else {
      this.inputElement.type = 'text';
      this.isTypePassword = false;
    }
  }
}
