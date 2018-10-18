import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'gd-tabs-outlet',
  templateUrl: './tabs-outlet.component.html',
  styleUrls: ['./tabs-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsOutletComponent implements OnInit {
  public ariaLabelledBy: string;
  public tabPanelId: string;

  @ViewChild('target', {read: ViewContainerRef})
  private target: ViewContainerRef;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {}

  public attach(content: TemplateRef<any>): void {
    this.target.clear();
    this.target.createEmbeddedView(content);
    this.changeDetector.markForCheck();
  }
}
