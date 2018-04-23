import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'gd-media-heading',
  templateUrl: './media-heading.component.html',
  styleUrls: ['./media-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaHeadingComponent implements OnInit {
  constructor() { }

  public ngOnInit() { }
}
