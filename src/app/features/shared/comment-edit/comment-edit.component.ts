import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import {
  AlertService
} from '../../../modules';

import {
  Comment,
  CommentService
} from '../../comments';

@Component({
  selector: 'gd-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentEditComponent implements OnInit {
  @Input()
  public comment: Comment;

  @Input()
  public giftId: string;

  public errors: any[];
  public commentForm: FormGroup;
  public isLoading = false;

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private commentService: CommentService,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.createForm();
    if (this.comment) {
      this.commentForm.reset(this.comment);
    }
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

    obs.subscribe(
      (result: any) => {
        console.log('COMMENT SUCCESS');
      },
      (err: any) => {
        const error = err.error;
        this.alertService.error(error.message);
        this.errors = error.errors;
        this.commentForm.enable();
        this.isLoading = false;
        this.changeDetector.markForCheck();
      }
    );
  }

  private createForm(): void {
    this.commentForm = this.formBuilder.group({
      body: undefined
    });
  }
}
