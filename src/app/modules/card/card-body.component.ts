import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'gd-card-body',
  templateUrl: './card-body.component.html',
  styleUrls: ['./card-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardBodyComponent implements OnInit {
  constructor() { }

  public ngOnInit(): void { }
}
