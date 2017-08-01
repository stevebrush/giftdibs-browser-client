import { Component, Input, OnChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnChanges, AfterViewInit {
  @Input()
  public disabled = false;

  @Input()
  public loadingText = 'Loading...';

  @Input()
  public classNames: string;

  @ViewChild('button')
  public button: ElementRef;
  public originalText: string;

  public ngAfterViewInit() {
    this.originalText = this.button.nativeElement.innerText;
  }

  public ngOnChanges(changes: any) {
    if (changes.disabled.firstChange) {
      return;
    }

    if (changes.disabled && changes.disabled.currentValue === true) {
      this.button.nativeElement.innerText = this.loadingText;
    } else {
      this.button.nativeElement.innerText = this.originalText;
    }
  }
}
