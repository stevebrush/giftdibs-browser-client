import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
  selector: 'gd-media-heading',
  templateUrl: './media-heading.component.html',
  styleUrls: ['./media-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaHeadingComponent { }
