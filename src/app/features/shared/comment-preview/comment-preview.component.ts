import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  DropdownMenuItem
} from '../../../modules';

import {
  SessionService
} from '../../account/session';

import {
  Comment
} from '../../comments';

@Component({
  selector: 'gd-comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.scss']
})
export class CommentPreviewComponent implements OnInit {
  @Input()
  public comment: Comment;

  public isOwner = false;

  public menuItems: DropdownMenuItem[] = [
    {
      label: 'Edit',
      action: () => {}
    },
    {
      label: 'Delete',
      action: () => {}
    }
  ];

  constructor(
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.isOwner = this.sessionService.isSessionUser(this.comment.user.id);
  }
}
