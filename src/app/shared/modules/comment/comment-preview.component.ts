import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import {
  AlertService
} from '@giftdibs/ux';

import {
  DropdownMenuItem
} from '@giftdibs/ux';

import {
  SessionService
} from '@giftdibs/session';

import {
  Comment
} from './comment';

import {
  CommentService
} from './comment.service';

@Component({
  selector: 'gd-comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentPreviewComponent implements OnInit, OnDestroy {
  @Input()
  public comment: Comment;

  @Output()
  public deleted = new EventEmitter<void>();

  public isEdit = false;
  public isOwner = false;

  public menuItems: DropdownMenuItem[] = [
    {
      label: 'Edit',
      action: () => {
        this.isEdit = true;
        this.changeDetector.markForCheck();
      }
    },
    {
      label: 'Delete',
      action: () => {
        this.commentService.remove(this.comment.id)
          .subscribe(
            () => {
              this.deleted.emit();
              this.deleted.complete();
            },
            (err: any) => {
              this.alertService.error(err.errors.message);
            }
          );
      }
    }
  ];

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private commentService: CommentService,
    private sessionService: SessionService
  ) { }

  public ngOnInit(): void {
    this.isOwner = this.sessionService.isSessionUser(this.comment.user.id);
  }

  public ngOnDestroy(): void {
    this.deleted.complete();
  }

  public onCancelled(): void {
    this.isEdit = false;
    this.changeDetector.markForCheck();
  }

  public onSaved(): void {
    this.isEdit = false;
    this.commentService.getById(this.comment.id)
      .subscribe(
        (comment: Comment) => {
          this.comment = comment;
          this.changeDetector.markForCheck();
        },
        (err: any) => {
          this.alertService.error(err.errors.message);
        }
      );
  }
}
