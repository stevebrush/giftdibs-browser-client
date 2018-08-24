import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'gd-card-thumbnail',
  templateUrl: './card-thumbnail.component.html',
  styleUrls: ['./card-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardThumbnailComponent implements OnInit {

  constructor() { }

  public ngOnInit(): void { }
}
