import { Component, Input } from '@angular/core';

@Component({
  selector: 'gd-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent {
  @Input()
  public mediaTitle: string;

  @Input()
  public imageSrc: string;
}
