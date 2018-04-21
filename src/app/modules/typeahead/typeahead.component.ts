import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  TemplateRef
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeWhile';

import { AffixService } from '../affix/affix.service';
import { OverlayService } from '../overlay/overlay.service';
import { OverlayInstance } from '../overlay/overlay-instance';

import { TypeaheadDomAdapterService } from './typeahead-dom-adapter.service';
import { TypeaheadSearchFunction } from './typeahead-search-function';
import { TypeaheadResultsComponent } from './typeahead-results.component';
import { TypeaheadResultsContext } from './typeahead-results-context';

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

  public ngAfterViewInit() {
    const input = this.searchInput.nativeElement;

    Observable
      .fromEvent(input, 'keyup')
      .takeUntil(this.ngUnsubscribe)
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe((event: any) => {
        this.search(event.target.value);
      });
  }

  public ngOnDestroy() {
    this.removeResults();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private search(searchText: string) {
    this.searchFunction.call({}, searchText)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((results: any[]) => {
        if (results.length === 0) {
          this.removeResults();
          return;
        }

        this.showResults(results);
      });
  }

  private showResults(results: any[]) {
    if (this.overlayInstance) {
      this.overlayInstance.destroy();
    }

    if (results.length === 0) {
      this.removeResults();
    }

    const resultsContext = new TypeaheadResultsContext();
    resultsContext.results = results;
    resultsContext.templateRef = this.searchResultTemplate;

    this.overlayInstance = this.overlayService.attach(TypeaheadResultsComponent, {
      providers: [
        {
          provide: TypeaheadResultsContext,
          useValue: resultsContext
        }
      ]
    });

    this.hasResults = true;
    this.overlayInstance.destroyStream.subscribe(() => {
      this.hasResults = false;
    });

    Observable
      .merge(
        Observable.fromEvent(window, 'scroll').takeWhile(() => this.hasResults),
        Observable.fromEvent(window, 'resize').takeWhile(() => this.hasResults)
      )
      .subscribe(() => {
        this.positionResults();
      });

    Observable
      .fromEvent(this.searchInput.nativeElement, 'keydown')
      .takeWhile(() => this.hasResults)
      .subscribe((event: any) => {
        const key = event.key.toLowerCase();
        if (key === 'tab') {
          this.removeResults();
        }
      });

    this.positionResults();
    this.changeDetector.markForCheck();
  }

  private removeResults() {
    this.hasResults = false;
    if (this.overlayInstance) {
      this.overlayInstance.destroy();
    }
    this.changeDetector.markForCheck();
  }

  private positionResults() {
    const resultsRef = this.overlayInstance.componentInstance.elementRef;
    this.affixService.affixTo(
      resultsRef,
      this.searchInput
    );
    this.domAdapter.matchWidth(
      resultsRef,
      this.searchInput
    );
  }
}
