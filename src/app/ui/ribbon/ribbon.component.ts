import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { RibbonType } from './types';

@Component({
  selector: 'gd-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RibbonComponent implements OnInit {
  @Input()
  public ribbonType: RibbonType = RibbonType.Info;

  constructor() { }

  public ngOnInit(): void {
  }

}
