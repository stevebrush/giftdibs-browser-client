import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { IconSize } from './icon-size';
import { IconStyle } from './icon-style';

@Component({
  selector: 'gd-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnInit {
  @Input()
  public icon: string;

  @Input()
  public iconSize: IconSize = '1x';

  @Input()
  public set iconStyle(value: IconStyle) {
    this._iconStyle = value;
  }

  public get iconStyle(): IconStyle {
    return this._iconStyle || 'default';
  }

  public classNames: string;

  private _iconStyle: IconStyle;

  public ngOnInit(): void {
    const classNames = [
      'fa-' + this.icon,
      'fa-' + this.iconSize
    ];
    this.classNames = classNames.join(' ');
  }
}
