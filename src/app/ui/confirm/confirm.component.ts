import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  AnimationEvent
} from '@angular/animations';

import {
  gdAnimationEmerge
} from '../animation';

import {
  ConfirmContext
} from './confirm-context';

import {
  ConfirmAnswerType
} from './confirm-answer-type';

@Component({
  selector: 'gd-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    gdAnimationEmerge
  ]
})
export class ConfirmComponent implements OnInit {
  public message: string;

  public get animationState(): string {
    return (this.isOpen) ? 'open' : 'closed';
  }

  private answerType: ConfirmAnswerType;
  private isOpen = true;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private context: ConfirmContext
  ) { }

  public ngOnInit(): void {
    this.message = this.context.config.message;
  }

  public confirm(): void {
    this.answerType = 'okay';
    this.close();
  }

  public cancel(): void {
    this.answerType = 'cancel';
    this.close();
  }

  public close(): void {
    this.isOpen = false;
    this.changeDetector.markForCheck();
  }

  public onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'closed') {
      this.context.answer({
        type: this.answerType
      });
    }
  }
}
