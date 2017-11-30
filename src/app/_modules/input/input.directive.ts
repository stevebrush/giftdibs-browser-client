import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[gdInput]'
})
export class GDInputDirective implements OnInit {
  constructor(
    public elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  public ngOnInit(): void {
    this.renderer.addClass(
      this.elementRef.nativeElement,
      'gd-input'
    );
  }
}
