import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import {
  Comment
} from '../../comments';

@Component({
  selector: 'gd-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent {
  @Input()
  public comments: Comment[];
}
