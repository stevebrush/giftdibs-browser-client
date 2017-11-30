import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[gdButton]'
})
export class GDButtonDirective implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  public ngOnInit(): void {
    this.renderer.addClass(
      this.elementRef.nativeElement,
      'gd-button'
    );
  }
}
