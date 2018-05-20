import {
  Directive,
  Input,
  TemplateRef
} from '@angular/core';

@Directive({
  selector: '[gdAffix]'
})
export class AffixDirective {
  @Input()
  public gdAffixTarget: TemplateRef<any>;
}
