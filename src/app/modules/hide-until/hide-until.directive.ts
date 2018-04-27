import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[gdHideUntil]'
})
export class HideUntilDirective implements OnInit, OnChanges {
  @Input()
  public gdHideUntil = false;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  public ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'opacity 150ms');
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'block');
    this.setOpacity(this.gdHideUntil);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.gdHideUntil) {
      this.setOpacity(changes.gdHideUntil.currentValue);
    }
  }

  private setOpacity(isVisible: boolean): void {
    const opacity = (isVisible) ? '1' : '0';
    this.renderer.setStyle(this.elementRef.nativeElement, 'opacity', opacity);
  }
}
