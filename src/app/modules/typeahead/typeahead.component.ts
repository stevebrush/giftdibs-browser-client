import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { TypeaheadSearchFunction } from './typeahead-search-function';

@Component({
  selector: 'gd-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeaheadComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  public ariaDescribedBy: string;

  @Input()
  public placeholder = 'Search';

  @Input()
  public searchFunction: TypeaheadSearchFunction<any>;

  public results: any[] = [];

  @ViewChild('searchInput')
  private searchInput: ElementRef;

  private ngUnsubscribe = new Subject();

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit() { }

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
    console.log('search()', searchText);
    this.searchFunction.call({}, searchText)
      .then((results: any[]) => {
        console.log('search results:', results);
        this.results = results;
        this.changeDetector.markForCheck();
      });
  }
}
