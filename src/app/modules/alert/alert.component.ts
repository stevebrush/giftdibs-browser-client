import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy
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
  NavigationStart,
  Router,
  RouterEvent
} from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

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
export class AlertComponent implements OnInit, OnDestroy {
  public alert: Alert;
  public animationState: 'hidden' | 'visible' = 'hidden';

  private ngUnsubscribe = new Subject();

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
    private instance: OverlayInstance<AlertComponent>,
    private router: Router
  ) {
    const alert = this.context.alert;
    // Clear alert message on route change?
    this.router.events
      .takeUntil(this.ngUnsubscribe)
      .subscribe((event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          if (alert.keepAfterNavigationChange) {
            alert.keepAfterNavigationChange = false;
          } else {
            this.instance.destroy();
          }
        }
      });
  }

  public ngOnInit(): void {
    this.alert = this.context.alert;
    this.animationState = 'visible';
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
