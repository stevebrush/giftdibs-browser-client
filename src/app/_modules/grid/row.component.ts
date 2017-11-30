import { Component, Input } from '@angular/core';

@Component({
  selector: 'gd-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class GDRowComponent {
  @Input()
  public reverseColumnOrder = false;
}
