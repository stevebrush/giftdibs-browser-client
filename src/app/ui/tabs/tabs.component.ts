import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList
} from '@angular/core';

import {
  TabComponent
} from './tab.component';

import {
  TabsOutletComponent
} from './tabs-outlet.component';

let nextId = 0;

@Component({
  selector: 'gd-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterContentInit {
  @Input()
  public ariaLabel: string;

  public tabButtons: {
    ariaControls: string;
    ariaSelected: boolean;
    heading: string;
    id: string;
  }[] = [];

  @ContentChildren(TabComponent)
  private tabComponents: QueryList<TabComponent>;

  @Input()
  private tabsOutlet: TabsOutletComponent;

  public ngAfterContentInit(): void {
    this.tabButtons = this.tabComponents.map((tabComponent, i) => {
      const id = `gd-tab-${nextId++}`;

      tabComponent.ariaLabelledBy = id;

      return {
        ariaControls: tabComponent.tabPanelId,
        ariaSelected: false,
        heading: tabComponent.tabHeading,
        id: id
      };
    });

    this.activateTab(0);
  }

  public activateTab(index: number): void {
    this.tabComponents.forEach((tabComponent, i: number) => {
      const isSelected = (i === index);
      tabComponent.isVisible = isSelected;
      this.tabButtons[i].ariaSelected = isSelected;

      if (isSelected) {
        tabComponent.tabClick.emit();

        if (this.tabsOutlet) {
          // TODO: This overwrites the content of the tab outlet.
          // Perhaps we should add all tab contents and hide the ones that arent' active?
          this.tabsOutlet.attach(tabComponent.tabContent);
          this.tabsOutlet.ariaLabelledBy = tabComponent.ariaLabelledBy;
          this.tabsOutlet.tabPanelId = tabComponent.tabPanelId;
        }
      }
    });
  }
}
