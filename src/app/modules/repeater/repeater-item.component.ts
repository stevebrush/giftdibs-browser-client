import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'gd-repeater-item',
  templateUrl: './repeater-item.component.html',
  styleUrls: ['./repeater-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepeaterItemComponent implements OnInit {
  constructor() { }

  public ngOnInit(): void { }
}
