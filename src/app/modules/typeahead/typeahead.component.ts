import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild
} from '@angular/core';

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

import {
  AffixService,
  AffixVerticalAlignment
} from '../affix';

import {
  OverlayInstance,
  OverlayService
} from '../overlay';

import { TypeaheadDomAdapterService } from './typeahead-dom-adapter.service';
import { TypeaheadResultsContext } from './typeahead-results-context';
import { TypeaheadResultsSelectionChange } from './typeahead-results-selection-change';
import { TypeaheadResultsComponent } from './typeahead-results.component';
import { TypeaheadSearchFunction } from './typeahead-search-function';
import { TypeaheadSearchResultAction } from './typeahead-search-result-action';

@Component({
  selector: 'gd-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AffixService,
    TypeaheadDomAdapterService
  ]
})
export class TypeaheadComponent implements AfterViewInit, OnDestroy {
  @Input()
  public ariaDescribedBy: string;

  @Input()
  public placeholder = 'Search';

  @Input()
  public searchFunction: TypeaheadSearchFunction<any>;

  @Input()
  public searchResultTemplate: TemplateRef<any>;

  @Input()
  public searchResultAction: TypeaheadSearchResultAction<any>;

  @ViewChild('searchInput')
  private searchInput: ElementRef;

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
        debounceTime(300),
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
          this.search(event.target.value);
          break;
        }
      });
  }

  public ngOnDestroy(): void {
    this.removeResults();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private search(searchText: string): void {
    this.searchFunction.call({}, searchText)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((results: any[]) => {
        if (results.length === 0) {
          this.removeResults();
          return;
        }

        if (this.hasResults) {
          this.overlayInstance.componentInstance.results = results;
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

    this.overlayInstance = this.overlayService.attach(TypeaheadResultsComponent, {
      providers: [{
        provide: TypeaheadResultsContext,
        useValue: resultsContext
      }]
    });

    this.hasResults = true;
    this.overlayInstance.destroyed.subscribe(() => {
      this.hasResults = false;
      this.changeDetector.markForCheck();
    });

    // Set the input value to what is selected in the dropdown.
    this.overlayInstance.componentInstance.selectionChange.subscribe((change: TypeaheadResultsSelectionChange) => {
      this.searchInput.nativeElement.value = change.label;
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
    const resultsRef = this.overlayInstance.componentInstance.elementRef;
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
      });

    fromEvent(this.searchInput.nativeElement, 'keydown')
      .pipe(
        takeWhile(() => this.hasResults)
      )
      .subscribe((event: any) => {
        const key = event.key.toLowerCase();

        if (key === 'tab' || key === 'escape') {
          this.searchInput.nativeElement.value = '';
          this.removeResults();
        }

        if (key === 'enter') {
          resultsComponent.triggerActiveResultAction();
        }
      });
  }
}
