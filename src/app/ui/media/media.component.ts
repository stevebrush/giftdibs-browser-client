import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
  selector: 'gd-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaComponent { }
