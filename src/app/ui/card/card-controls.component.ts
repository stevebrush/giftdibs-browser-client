import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'gd-card-controls',
  templateUrl: './card-controls.component.html',
  styleUrls: ['./card-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardControlsComponent implements OnInit {

  constructor() { }

  public ngOnInit(): void {
  }

}
