import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'gd-media-header',
  templateUrl: './media-header.component.html',
  styleUrls: ['./media-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaHeaderComponent implements OnInit {
  constructor() { }

  public ngOnInit(): void { }
}
