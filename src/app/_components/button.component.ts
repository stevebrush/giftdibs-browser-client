import { Component, Input, OnInit, OnChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  public disabled = false;

  @Input()
  public loadingText = 'Loading...';

  @Input()
  public classNames = '';

  @Input()
  public type = 'button';

  @Input()
  public fullWidth = false;

  @Input()
  public styleType = 'default';

  @ViewChild('button')
  private button: ElementRef;
  private originalText: string;

  public ngOnInit(): void {
    const cssClasses = this.classNames.split(' ');

    if (this.fullWidth) {
      cssClasses.push('app-button-block');
    }

    if (this.styleType) {
      cssClasses.push(`app-button-${this.styleType.toLowerCase().trim()}`);
    }

    this.classNames = cssClasses.join(' ');
  }

  public ngAfterViewInit() {
    this.originalText = this.button.nativeElement.innerText;
  }

  public ngOnChanges(changes: any) {
    if (changes.disabled) {
      if (changes.disabled.firstChange) {
        return;
      }

      const isDisabled = (changes.disabled.currentValue === true);
      if (isDisabled) {
        this.setButtonLabel(this.loadingText);
        return;
      }
    }

    this.setButtonLabel(this.originalText);
  }

  private setButtonLabel(value: string): void {
    if (!value) {
      return;
    }

    this.button.nativeElement.innerText = value;
  }
}
