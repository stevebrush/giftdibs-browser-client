import {
  ChangeDetectionStrategy,
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
  OverlayInstance
} from '../overlay';

import { Alert } from './alert';
import { AlertContext } from './alert-context';

@Component({
  selector: 'gd-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    gdAnimationEmerge
  ]
})
export class AlertComponent implements OnInit {
  public alert: Alert;
  public animationState: 'open' | 'closed' = 'closed';

  public get ariaLive(): string {
    let live: string;

    switch (this.alert.type) {
      case 'danger':
      live = 'assertive';
      break;
      default:
      live = 'polite';
      break;
    }

    return live;
  }

  constructor(
    private context: AlertContext,
    private instance: OverlayInstance<AlertComponent>
  ) { }

  public ngOnInit(): void {
    this.alert = this.context.alert;
    this.animationState = 'open';
  }

  public onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'closed') {
      this.instance.destroy();
    }
  }

  public close(): void {
    this.animationState = 'closed';
  }
}
