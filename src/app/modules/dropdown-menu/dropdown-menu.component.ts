import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {
  AnimationEvent
} from '@angular/animations';

import {
  fromEvent,
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
  OverlayInstance
} from '../overlay';

import {
  WindowRefService
} from '../window';

import { DropdownMenuContext } from './dropdown-menu-context';
import { DropdownMenuItem } from './dropdown-menu-item';

@Component({
  selector: 'gd-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    gdAnimationEmerge
  ],
  providers: [
    AffixService
  ]
})
export class DropdownMenuComponent implements OnInit, AfterContentInit, OnDestroy {
  public get animationState(): string {
    return (this.isOpen) ? 'open' : 'closed';
  }

  public set itemTemplate(value: TemplateRef<any>) {
    this._itemTemplate = value;
  }

  public get itemTemplate(): TemplateRef<any> {
    return this._itemTemplate || this.defaultItemTemplate;
  }

  public items: any[];
  public isVisible = false;

  @ViewChild('defaultItemTemplate')
  private defaultItemTemplate: TemplateRef<any>;

  private get activeIndex(): number {
    return this._activeIndex;
  }

  private set activeIndex(value: number) {
    if (value > this.buttons.length - 1) {
      value = 0;
    }

    if (value < 0) {
      value = this.buttons.length - 1;
    }

    this._activeIndex = value;
  }

  private buttons: any[];
  private isOpen = true;
  private ngUnsubscribe = new Subject();

  private _activeIndex = -1;
  private _itemTemplate: TemplateRef<any>;

  @ViewChild('menuElementRef')
  private menuElementRef: ElementRef;

  constructor(
    private affixService: AffixService,
    private changeDetector: ChangeDetectorRef,
    private context: DropdownMenuContext,
    private elementRef: ElementRef,
    private overlayInstance: OverlayInstance<any>,
    private windowRef: WindowRefService
  ) { }

  public ngOnInit(): void {
    const hostElement = this.elementRef.nativeElement;
    const nativeWindow = this.windowRef.nativeWindow;

    let isLastButtonFocused = false;

    this.items = this.context.config.items;
    this.itemTemplate = this.context.config.itemTemplate;

    // Close the menu after any click event.
    // (Timeout needed so the click is not registered on the caller button.)
    nativeWindow.setTimeout(() => {
      fromEvent(nativeWindow, 'click')
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(() => {
          console.log('clicked!');
          this.close();
        });
    });

    // Close the menu with escape key.
    fromEvent(hostElement, 'keyup')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: any) => {
        const key = event.key.toLowerCase();
        if (key === 'escape') {
          this.close();
        }
      });

    // Navigate the items with arrow keys.
    fromEvent(hostElement, 'keydown')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: any) => {
        const key = event.key.toLowerCase();

        if (key === 'arrowdown' || key === 'down') {
          this.activeIndex++;
          this.focusActiveButton();
          event.preventDefault();
        }

        if (key === 'arrowup' || key === 'up') {
          this.activeIndex--;
          this.focusActiveButton();
          event.preventDefault();
        }

        // Close the menu if the last item is focused and the tab key is pressed.
        if (key === 'tab' && isLastButtonFocused) {
          this.close();
          event.preventDefault();
          event.stopPropagation();
        }
      });

    // This will check if the focus leaves the document.
    fromEvent(hostElement, 'focusin')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: any) => {
        isLastButtonFocused = event.target === this.buttons[this.buttons.length - 1];
      });

    fromEvent(nativeWindow, 'scroll')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.positionMenu();
      });

    fromEvent(nativeWindow, 'resize')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.positionMenu();
      });

    this.changeDetector.markForCheck();
  }

  public ngAfterContentInit(): void {
    this.windowRef.nativeWindow.setTimeout(() => {
      this.positionMenu();
      this.buttons = [].slice.call(this.elementRef.nativeElement.querySelectorAll('.gd-button'));
      this.menuElementRef.nativeElement.focus();
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public handleItemAction(item: DropdownMenuItem): void {
    item.action();
    this.close();
  }

  public onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'closed') {
      this.overlayInstance.destroy();
    }
  }

  public close(): void {
    this.isOpen = false;
    this.changeDetector.markForCheck();
    this.context.config.caller.nativeElement.focus();
  }

  private focusActiveButton(): void {
    this.buttons[this.activeIndex].focus();
  }

  private positionMenu(): void {
    this.affixService.affixTo(
      this.elementRef,
      this.context.config.caller,
      {
        horizontalAlignment: this.context.config.horizontalAlignment,
        verticalAlignment: this.context.config.verticalAlignment
      }
    );

    this.isVisible = true;
    this.changeDetector.detectChanges();
  }
}
