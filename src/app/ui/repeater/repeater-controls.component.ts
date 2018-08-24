import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'gd-repeater-controls',
  templateUrl: './repeater-controls.component.html',
  styleUrls: ['./repeater-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepeaterControlsComponent implements OnInit {
  constructor() { }

  public ngOnInit(): void { }
}
