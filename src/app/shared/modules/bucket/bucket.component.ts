import { Component, Input } from '@angular/core';

@Component({
  selector: 'gd-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent {
  @Input()
  public isDisabled = false;
}
