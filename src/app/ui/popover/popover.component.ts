import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {
  AnimationEvent
} from '@angular/animations';

import {
  fromEvent,
  Observable,
  Subject
} from 'rxjs';

import {
  takeUntil
} from 'rxjs/operators';

import {
  AffixService
} from '../affix';

import {
  gdAnimationEmerge
} from '../animation';

import {
  GD_FOCUSABLE_SELECTORS
} from '../shared';

import {
  WindowRefService
} from '../window';

import {
  GdPopoverConfig
} from './types';

@Component({
  selector: 'gd-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    gdAnimationEmerge
  ],
  providers: [
    AffixService
  ]
})
export class GdPopoverComponent implements OnDestroy {
  public get closed(): Observable<void> {
    return this._closed;
  }

  public get animationState(): string {
    return (this.isOpen) ? 'open' : 'closed';
  }

  @ViewChild('popover')
  private popover: ElementRef;

  @ViewChild('target', { read: ViewContainerRef })
  private targetRef: ViewContainerRef;

  private config: GdPopoverConfig;
  private focusableElements: any[];
  private isOpen = false;
  private ngUnsubscribe = new Subject();

  private _closed = new EventEmitter<void>();

  constructor(
    public elementRef: ElementRef,
    private affixService: AffixService,
    private changeDetector: ChangeDetectorRef,
    private windowRef: WindowRefService
  ) { }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this._closed.complete();
  }

  public onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'closed') {
      this._closed.emit();
      this._closed.complete();
    }
  }

  public attach(templateRef: TemplateRef<any>, config?: GdPopoverConfig): void {
    const nativeWindow = this.windowRef.nativeWindow;
    const popoverElement = this.elementRef.nativeElement;

    let isLastButtonFocused = false;

    this.targetRef.createEmbeddedView(templateRef);
    this.config = config;
    this.positionPopover();

    nativeWindow.setTimeout(() => {

      // Close the menu after any click event.
      // (Timeout needed so the click is not registered on the caller button.)
      fromEvent(nativeWindow, 'click')
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(() => {
          this.close();
        });

      // Get a list of all focusable elements in the popover.
      this.assignFocusableElements();
    });

    fromEvent(popoverElement, 'click')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: any) => {
        event.stopPropagation();
      });

    fromEvent(popoverElement, 'keydown')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: any) => {
        const key = event.key.toLowerCase();

        // Close the menu if the last item is focused and the tab key is pressed.
        if (key === 'tab' && isLastButtonFocused) {
          this.close();
          this.focusTriggerButton();
          event.preventDefault();
          event.stopPropagation();
        }
      });

    // Close the menu with escape key.
    fromEvent(popoverElement, 'keyup')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: any) => {
        const key = event.key.toLowerCase();
        if (key === 'escape') {
          this.close();
          this.focusTriggerButton();
        }
      });

    fromEvent(nativeWindow, 'scroll')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.positionPopover();
      });

    fromEvent(nativeWindow, 'resize')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.positionPopover();
      });

    // This will check if the focus leaves the document.
    fromEvent(popoverElement, 'focusin')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: any) => {
        isLastButtonFocused = (
          event.target ===
          this.focusableElements[this.focusableElements.length - 1]
        );
      });

    this.isOpen = true;
    this.changeDetector.markForCheck();
  }

  public close(): void {
    this.isOpen = false;
    this.changeDetector.markForCheck();
  }

  public focusHostElement(): void {
    this.popover.nativeElement.focus();
  }

  private positionPopover(): void {
    this.affixService.affixTo(
      this.elementRef,
      this.config.trigger,
      this.config.affix
    );
  }

  private assignFocusableElements(): void {
    const elements: HTMLElement[] = [].slice.call(
      this.elementRef.nativeElement.querySelectorAll(GD_FOCUSABLE_SELECTORS)
    );

    const focusableElements = elements
      .filter(element => this.isVisible(element))
      .filter(element => element.tabIndex !== -1);

    this.focusableElements = focusableElements;
  }

  private isVisible(element: HTMLElement): boolean {
    return !!(
      element.offsetWidth ||
      element.offsetHeight ||
      element.getClientRects().length
    );
  }

  private focusTriggerButton(): void {
    this.config.trigger.nativeElement.focus();
  }
}
