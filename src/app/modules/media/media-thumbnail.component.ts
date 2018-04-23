import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'gd-media-thumbnail',
  templateUrl: './media-thumbnail.component.html',
  styleUrls: ['./media-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaThumbnailComponent implements OnInit {
  constructor() { }

  public ngOnInit() { }
}
