import { Component } from '@angular/core';

@Component({
  selector: 'gd-card-composer',
  templateUrl: './card-composer.component.html',
  styleUrls: ['./card-composer.component.scss']
})
export class CardComposerComponent {
  public isVisible = false;

  public showComposer(): void {
    this.isVisible = true;
  }

  public hideComposer(): void {
    this.isVisible = false;
  }
}
