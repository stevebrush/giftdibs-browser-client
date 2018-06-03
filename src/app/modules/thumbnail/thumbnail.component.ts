import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'gd-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailComponent {
  @Input()
  public size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

  @Input()
  public type: 'default' | 'user' = 'default';

  public get classNames(): string {
    const classNames = [
      'gd-thumbnail-' + this.size
    ];

    if (this.type === 'user') {
      classNames.push('gd-rounded-corners-circle');
    }

    return classNames.join(' ');
  }
}
