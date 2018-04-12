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

@Component({
  selector: 'gd-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private search(searchText: string) {
    this.searchFunction.call({}, searchText)
      .then((results: any[]) => {
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

    this.overlayInstance = this.overlayService.open(TypeaheadResultsComponent, {
      showBackdrop: true,
      providers: [
        { provide: TypeaheadResultsContext, useValue: resultsContext }
      ]
    });

    this.changeDetector.markForCheck();
  }
}
