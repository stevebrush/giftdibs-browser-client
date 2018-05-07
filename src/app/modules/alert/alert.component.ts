import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

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
    trigger('gdSlideIn', [
      state('hidden', style({ transform: 'translateX(-100%)' })),
      state('visible', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('250ms ease-in-out')
      ]),
      transition(`* <=> *`, animate('250ms ease-in-out'))
    ])
  ]
})
export class AlertComponent implements OnInit {
  public alert: Alert;
  public animationState: 'hidden' | 'visible' = 'hidden';

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
    this.animationState = 'visible';
  }

  public onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'hidden') {
      this.instance.destroy();
    }
  }

  public close(): void {
    this.animationState = 'hidden';
  }
}
