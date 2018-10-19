import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

let nextId = 0;

@Component({
  selector: 'gd-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit, OnDestroy {
  @Input()
  public tabHeading: string;

  @Output()
  public tabClick = new EventEmitter();

  public get isVisible(): boolean {
    return this._isVisible;
  }

  public set isVisible(value: boolean) {
    this._isVisible = value;
    this.changeDetector.markForCheck();
  }

  public ariaLabelledBy: string;
  public tabPanelId: string;

  private _isVisible = false;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
    this.tabPanelId = `gd-tabpanel-${nextId++}`;
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.tabClick.complete();
  }
}
