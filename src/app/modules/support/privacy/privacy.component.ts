import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
  selector: 'gd-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyComponent { }
