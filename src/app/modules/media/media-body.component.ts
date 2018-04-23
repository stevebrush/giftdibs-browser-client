import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'gd-media-body',
  templateUrl: './media-body.component.html',
  styleUrls: ['./media-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaBodyComponent implements OnInit {
  constructor() { }

  public ngOnInit() { }
}
