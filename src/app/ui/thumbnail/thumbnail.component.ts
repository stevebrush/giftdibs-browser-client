import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { NavigationExtras } from '@angular/router';

import {
  IconSize,
  IconStyle
} from '@app/ui/icon';

@Component({
  selector: 'gd-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailComponent {
  @Input()
  public set icon(value: string) {
    this._icon = value;
  }

  public get icon(): string {
    if (this._icon) {
      return this._icon;
    }

    return (this.type === 'user') ? 'user' : 'image';
  }

  @Input()
  public set iconSize(value: IconSize) {
    this._iconSize = value;
  }

  public get iconSize(): IconSize {
    if (this._iconSize) {
      return this._iconSize;
    }

    let size: IconSize;

    switch (this.size) {
      case 'fill':
      case 'static':
      case 'lg':
      size = '3x';
      break;

      case 'md':
      size = '2x';
      break;

      default:
      size = '1x';
      break;
    }

    return size;
  }

  @Input()
  public iconStyle: IconStyle;

  @Input()
  public imageSource: string;

  @Input()
  public route: {
    commands: any[],
    extras?: NavigationExtras;
  };

  @Input()
  public size: 'xs' | 'sm' | 'md' | 'lg' | 'fill' | 'static' = 'md';

  @Input()
  public title: string;

  @Input()
  public type: 'default' | 'user' = 'default';

  public get classNames(): string {
    const classNames = [];

    if (!this.imageSource) {
      classNames.push('gd-thumbnail-empty');
    }

    if (this.size === 'static' && !this.imageSource) {
      classNames.push('gd-thumbnail-fill');
    } else {
      classNames.push('gd-thumbnail-' + this.size);
    }

    return classNames.join(' ');
  }

  private _icon: string;
  private _iconSize: IconSize;
}
