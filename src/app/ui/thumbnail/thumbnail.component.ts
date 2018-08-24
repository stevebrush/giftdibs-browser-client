import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'gd-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailComponent {
  @Input()
  public size: 'xs' | 'sm' | 'md' | 'lg' | 'full' = 'md';

  @Input()
  public imageSource: string;

  @Input()
  public type: 'default' | 'user' = 'default';

  @Input()
  public route: {
    commands: any[],
    extras?: NavigationExtras;
  };

  @Input()
  public title: string;
}
