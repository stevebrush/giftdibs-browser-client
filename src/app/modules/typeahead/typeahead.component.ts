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

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { TypeaheadSearchFunction } from './typeahead-search-function';
import { TypeaheadResultsComponent } from './typeahead-results.component';

import { OverlayService } from '../overlay/overlay.service';
import { OverlayInstance } from '../overlay/overlay-instance';
import { TypeaheadResultsContext } from './typeahead-results-context';
import { AffixService } from '../affix/affix.service';

@Component({
  selector: 'gd-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AffixService]
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

  public results: any[] = [];

  @ViewChild('searchInput')
  private searchInput: ElementRef;

  private ngUnsubscribe = new Subject();
  private overlayInstance: OverlayInstance<TypeaheadResultsComponent>;

  constructor(
    private affixService: AffixService,
    private changeDetector: ChangeDetectorRef,
    private overlayService: OverlayService
  ) { }

  public ngAfterViewInit() {
    const element = this.searchInput.nativeElement;

    Observable
      .fromEvent(element, 'keyup')
      .takeUntil(this.ngUnsubscribe)
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe((event: any) => {
        this.search(event.target.value);
      });

    Observable
      .fromEvent(window, 'scroll')
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        if (this.overlayInstance) {
          this.positionResults();
        }
      });
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private search(searchText: string) {
    this.searchFunction.call({}, searchText)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((results: any[]) => {
        this.results = results;
        this.showResults();
      });
  }

  private showResults() {
    if (this.overlayInstance) {
      this.overlayInstance.destroy();
    }

    const resultsContext = new TypeaheadResultsContext();
    resultsContext.results = this.results;
    resultsContext.templateRef = this.searchResultTemplate;

    this.overlayInstance = this.overlayService.attach(TypeaheadResultsComponent, {
      providers: [
        { provide: TypeaheadResultsContext, useValue: resultsContext }
      ]
    });

    this.positionResults();
    this.changeDetector.markForCheck();
  }

  private positionResults() {
    const resultsElement = this.overlayInstance.componentInstance.elementRef.nativeElement;
    const inputElement = this.searchInput.nativeElement;
    this.affixService.affixTo(resultsElement, inputElement);
  }
}
