import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import {
  AffixService,
  AffixVerticalAlignment,
  OverlayConfig,
  OverlayInstance,
  OverlayService
} from '@app/ui';

import {
  fromEvent,
  merge,
  Subject
} from 'rxjs';

import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  takeWhile
} from 'rxjs/operators';

import { TypeaheadDomAdapterService } from './typeahead-dom-adapter.service';
import { TypeaheadResultsContext } from './typeahead-results-context';
import { TypeaheadResultsSelectionChange } from './typeahead-results-selection-change';
import { TypeaheadResultsComponent } from './typeahead-results.component';
import { TypeaheadSearchFunction } from './typeahead-search-function';
import { TypeaheadSearchResultAction } from './typeahead-search-result-action';

const KEYUP_DEBOUNCE_TIME = 400;

@Component({
  selector: 'gd-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AffixService,
    TypeaheadDomAdapterService,
    {
      provide: NG_VALUE_ACCESSOR,
      /* tslint:disable-next-line:no-forward-ref */
      useExisting: forwardRef(() => TypeaheadComponent),
      multi: true
    }
  ]
})
export class TypeaheadComponent
  implements AfterViewInit, OnDestroy, ControlValueAccessor {

  @Input()
  public ariaDescribedBy: string;

  @Input()
  public placeholder: string;

  @Input()
  public searchFunction: TypeaheadSearchFunction<any>;

  @Input()
  public searchResultTemplate: TemplateRef<any>;

  @Input()
  public searchResultAction: TypeaheadSearchResultAction<any>;

  @Input()
  public set value(value: any) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  public get value(): any {
    return this._value;
  }

  public disabled = false;

  @ViewChild('searchInput')
  private searchInput: ElementRef;

  private _value: string;
  private hasResults = false;
  private ngUnsubscribe = new Subject();
  private overlayInstance: OverlayInstance<TypeaheadResultsComponent>;

  constructor(
    private affixService: AffixService,
    private changeDetector: ChangeDetectorRef,
    private domAdapter: TypeaheadDomAdapterService,
    private overlayService: OverlayService
  ) { }

  public ngAfterViewInit(): void {
    const input = this.searchInput.nativeElement;

    fromEvent(input, 'keyup')
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(KEYUP_DEBOUNCE_TIME),
        distinctUntilChanged()
      )
      .subscribe((event: any) => {
        const key = event.key.toLowerCase();
        switch (key) {
          case 'tab':
          case 'enter':
          case 'escape':
          case 'arrowup':
          case 'arrowdown':
          case 'up':
          case 'down':
          break;

          default:
          const keywords = event.target.value;

          if (keywords !== this.value) {
            this.search(event.target.value);
            this.value = event.target.value;
          }

          break;
        }
      });

    fromEvent(document, 'click')
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.removeResults();
      });
  }

  public ngOnDestroy(): void {
    this.removeResults();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public writeValue(value: string): void {
    if (value) {
      this.searchInput.nativeElement.value = value;
      this._value = value;
    }
  }

  // Angular automatically constructs these methods.
  public onChange = (value: any) => {};
  public onTouched = () => {};

  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetector.markForCheck();
  }

  private search(searchText: string): void {
    this.searchFunction.call({}, searchText)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((results: any[]) => {
        if (!results || results.length === 0) {
          this.removeResults();
          return;
        }

        if (this.hasResults) {
          this.overlayInstance.componentInstance.results = results;
          this.positionResults();
          return;
        }

        this.showResults(results);
      });
  }

  private showResults(results: any[]): void {
    const resultsContext = new TypeaheadResultsContext();
    resultsContext.results = results;
    resultsContext.templateRef = this.searchResultTemplate;
    resultsContext.resultSelectedAction = this.searchResultAction;

    const overlayConfig: OverlayConfig = {
      providers: [{
        provide: TypeaheadResultsContext,
        useValue: resultsContext
      }]
    };

    this.overlayInstance = this.overlayService.attach(
      TypeaheadResultsComponent,
      overlayConfig
    );

    // Set the input value to what is selected in the dropdown.
    this.overlayInstance.componentInstance.selectionChange
      .subscribe((change: TypeaheadResultsSelectionChange) => {
        if (change.label !== undefined) {
          this.searchInput.nativeElement.value = change.label;
        }

        this.overlayInstance.destroy();
      });

    this.hasResults = true;
    this.overlayInstance.destroyed.subscribe(() => {
      this.hasResults = false;
      this.changeDetector.markForCheck();
    });

    this.positionResults();
    this.addEventListeners();
    this.changeDetector.markForCheck();
  }

  private removeResults(): void {
    this.hasResults = false;
    if (this.overlayInstance) {
      this.overlayInstance.destroy();
    }

    this.changeDetector.markForCheck();
  }

  private positionResults(): void {
    console.log('positionResults()');
    this.overlayInstance.componentInstance.hideResults();
    const resultsRef = this.overlayInstance.componentInstance.elementRef;

    setTimeout(() => {
      this.affixService.affixTo(
        resultsRef,
        this.searchInput,
        {
          verticalAlignment: AffixVerticalAlignment.Bottom
        }
      );

      this.domAdapter.matchWidth(
        resultsRef,
        this.searchInput
      );

      this.overlayInstance.componentInstance.showResults();
    });
  }

  private addEventListeners(): void {
    const resultsComponent = this.overlayInstance.componentInstance;

    merge(
      fromEvent(window, 'scroll')
        .pipe(
          takeWhile(() => this.hasResults)
        ),
      fromEvent(window, 'resize')
        .pipe(
          takeWhile(() => this.hasResults)
        )
    ).subscribe(() => {
      this.positionResults();
    });

    fromEvent(this.searchInput.nativeElement, 'keydown')
      .pipe(
        takeWhile(() => this.hasResults)
      )
      .subscribe((event: any) => {
        const key = event.key.toLowerCase();

        if (key === 'arrowdown' || key === 'down') {
          resultsComponent.focusNextItem();
        }

        if (key === 'arrowup' || key === 'up') {
          resultsComponent.focusPreviousItem();
        }

        if (key === 'tab' || key === 'escape') {
          this.searchInput.nativeElement.value = '';
          this.removeResults();
        }

        if (key === 'enter') {
          resultsComponent.triggerActiveResultAction();
        }
      });

    fromEvent(resultsComponent.elementRef.nativeElement, 'click')
      .pipe(
        takeWhile(() => this.hasResults)
      )
      .subscribe((event: any) => {
        event.stopPropagation();
      });
  }
}
