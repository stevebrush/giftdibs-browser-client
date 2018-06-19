import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'gd-gift-priority',
  templateUrl: './gift-priority.component.html',
  styleUrls: ['./gift-priority.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiftPriorityComponent implements OnInit {
  @Input()
  public priority = 1;

  constructor() { }

  public ngOnInit(): void { }
}
