import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'gd-repeater',
  templateUrl: './repeater.component.html',
  styleUrls: ['./repeater.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepeaterComponent implements OnInit {
  constructor() { }

  public ngOnInit(): void { }
}
