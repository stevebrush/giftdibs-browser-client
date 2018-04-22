import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  TemplateRef
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { OverlayInstance } from '../overlay/overlay-instance';

import { TypeaheadResultsContext } from './typeahead-results-context';
import { TypeaheadResultsSelectionChange } from './typeahead-results-selection-change';

@Component({
  selector: 'gd-typeahead-results',
  templateUrl: './typeahead-results.component.html',
  styleUrls: ['./typeahead-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeaheadResultsComponent implements OnInit, OnDestroy {
  public get results(): any[] {
    return this._results;
  }

  public set results(value: any[]) {
    this._results = value;
    this.activeIndex = 0;
    this.changeDetector.markForCheck();
  }

  public get activeIndex(): number {
    return this._activeIndex;
  }

  public set activeIndex(value: number) {
    if (value > this.results.length - 1) {
      value = 0;
    }

    if (value < 0) {
      value = this.results.length - 1;
    }

    this._activeIndex = value;
    this.changeDetector.markForCheck();
  }

  public get activeResult(): any {
    return this.results[this.activeIndex];
  }

  public templateRef: TemplateRef<any>;
  public selectionChange = new Subject<TypeaheadResultsSelectionChange>();

  private _activeIndex = 0;
  private _results: any[];

  constructor(
    public elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef,
    private context: TypeaheadResultsContext,
    private overlay: OverlayInstance<any>
  ) { }

  public ngOnInit() {
    this.results = this.context.results;
    this.templateRef = this.context.templateRef;
  }

  public ngOnDestroy() {
    this.selectionChange.complete();
  }

  public onResultClick(result: any) {
    const label = this.context.resultSelectedAction.call({}, result);
    this.selectionChange.next({
      result,
      label
    });
    this.close();
  }

  public triggerActiveResultAction() {
    this.onResultClick(this.activeResult);
  }

  @HostListener('click', ['$event'])
  public onClick(event: any) {
    event.stopPropagation();
  }

  @HostListener('document:click')
  public onDocumentClick() {
    this.close();
  }

  public focusNextItem() {
    this.activeIndex++;
  }

  public focusPreviousItem() {
    this.activeIndex--;
  }

  private close() {
    this.overlay.destroy();
  }
}
