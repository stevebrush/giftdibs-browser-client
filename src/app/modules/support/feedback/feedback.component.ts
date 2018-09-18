import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
  selector: 'gd-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackComponent { }
