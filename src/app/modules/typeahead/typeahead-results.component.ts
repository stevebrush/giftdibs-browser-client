import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  TemplateRef
} from '@angular/core';

import { OverlayInstance } from '../overlay/overlay-instance';

import { TypeaheadResultsContext } from './typeahead-results-context';

@Component({
  selector: 'gd-typeahead-results',
  templateUrl: './typeahead-results.component.html',
  styleUrls: ['./typeahead-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeaheadResultsComponent implements OnInit {
  public results: any[];
  public templateRef: TemplateRef<any>;

  constructor(
    public elementRef: ElementRef,
    private context: TypeaheadResultsContext,
    private overlay: OverlayInstance<any>
  ) { }

  public ngOnInit() {
    this.results = this.context.results;
    this.templateRef = this.context.templateRef;
  }

  @HostListener('click', ['$event'])
  public onClick(event: any) {
    event.stopPropagation();
  }

  @HostListener('document:click')
  public onDocumentClick() {
    this.close();
  }

  public close() {
    this.overlay.destroy();
  }
}
