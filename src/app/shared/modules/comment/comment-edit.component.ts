import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AlertService } from '@giftdibs/ux';

import { finalize } from 'rxjs/operators';

import { Comment } from './comment';
import { CommentService } from './comment.service';

@Component({
  selector: 'gd-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentEditComponent implements OnInit, OnDestroy {
  @Input()
  public comment: Comment;

  @Input()
  public giftId: string;

  @Output()
  public cancelled = new EventEmitter<void>();

  @Output()
  public saved = new EventEmitter<void>();

  public errors: any[];
  public commentForm: UntypedFormGroup;
  public isLoading = false;

  @ViewChild('commentInput', { static: true })
  private commentInput: ElementRef<any>;

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private commentService: CommentService,
    private formBuilder: UntypedFormBuilder,
  ) {}

  public ngOnInit(): void {
    this.createForm();
    if (this.comment) {
      this.commentForm.reset(this.comment);
      this.commentInput.nativeElement.focus();
    }
  }

  public ngOnDestroy(): void {
    this.cancelled.complete();
    this.saved.complete();
  }

  public submit(): void {
    if (this.commentForm.disabled) {
      return;
    }

    this.commentForm.disable();
    this.isLoading = true;
    this.errors = [];
    this.changeDetector.markForCheck();

    const formData: Comment = this.commentForm.value;

    let obs: any;
    if (this.comment) {
      obs = this.commentService.update(this.comment.id, formData);
    } else {
      obs = this.commentService.create(this.giftId, formData);
    }

    obs
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.commentForm.reset();
          this.commentForm.enable();
          this.changeDetector.markForCheck();
        }),
      )
      .subscribe(
        () => {
          this.saved.emit();
        },
        (err: any) => {
          const error = err.error;
          this.alertService.error(error.message);
          this.errors = error.errors;
        },
      );
  }

  public onCancelClick(): void {
    this.cancelled.emit();
    this.cancelled.complete();
  }

  private createForm(): void {
    this.commentForm = this.formBuilder.group({
      body: undefined,
    });
  }
}
