import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'gd-card-heading',
  templateUrl: './card-heading.component.html',
  styleUrls: ['./card-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardHeadingComponent implements OnInit {
  constructor() { }

  public ngOnInit() { }
}
