import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'gd-gift-priority',
  templateUrl: './gift-priority.component.html',
  styleUrls: ['./gift-priority.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftPriorityComponent {
  @Input()
  public priority = 1;
}
