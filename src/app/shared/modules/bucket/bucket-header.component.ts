import { Component, Input } from '@angular/core';

@Component({
  selector: 'gd-bucket-header',
  templateUrl: './bucket-header.component.html',
  styleUrls: ['./bucket-header.component.scss']
})
export class BucketHeaderComponent {
  @Input()
  public bucketTitle: string;
}
