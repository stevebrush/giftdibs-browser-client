import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

export type IconStyle = 'default' | 'success' | 'deemphasized';

@Component({
  selector: 'gd-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  @Input()
  public icon: string;

  @Input()
  public set iconStyle(value: IconStyle) {
    this._iconStyle = value;
  }

  public get iconStyle(): IconStyle {
    return this._iconStyle || 'default';
  }

  private _iconStyle: IconStyle;
}
