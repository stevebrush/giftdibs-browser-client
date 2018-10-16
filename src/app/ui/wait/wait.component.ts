import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
  selector: 'gd-wait',
  templateUrl: './wait.component.html',
  styleUrls: ['./wait.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitComponent {}
