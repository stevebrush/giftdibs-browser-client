import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input()
  public isVisible = false;

  public constructor() {
  }

  // public ngAfterContentInit(): void {
  //   console.log(this.isVisibleStream);
  //   this.isVisibleStream.subscribe((isVisible: boolean) => {
  //     console.log('isVisible?', isVisible);
  //     this.isVisible = isVisible;
  //   });
  // }

  // public ngOnChanges(changes: any): void {
  //   if (changes.isVisibleStream && !changes.isVisibleStream.firstChange) {
  //     console.log('changes?', changes);
  //   }
  // }
}
