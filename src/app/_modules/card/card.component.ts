/*tslint:disable:component-selector*/
import { Component, Input } from '@angular/core';

@Component({
  selector: 'gd-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class GDCardComponent {
  @Input()
  public cardTitle: string;
}
