import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gd-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowersComponent {}
