import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import {
  NavigationExtras
} from '@angular/router';

@Component({
  selector: 'gd-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input()
  public route: {
    commands: any[],
    extras?: NavigationExtras;
  };
}
