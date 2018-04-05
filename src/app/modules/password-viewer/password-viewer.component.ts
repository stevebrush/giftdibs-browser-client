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
  public isVisible = false;

  public togglePasswordInputType() {
    if (this.inputElement.type === 'text') {
      this.inputElement.type = 'password';
      this.isVisible = false;
    } else {
      this.inputElement.type = 'text';
      this.isVisible = true;
    }
  }
}
