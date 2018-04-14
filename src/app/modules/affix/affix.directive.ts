import {
  Directive,
  Input,
  TemplateRef
} from '@angular/core';

import { AffixAlignment } from './affix-alignment';
import { AffixPlacement } from './affix-placement';

@Directive({
  selector: '[gdAffix]'
})
export class AffixDirective {
  @Input()
  public gdAffixTarget: TemplateRef<any>;

  @Input()
  public placement: AffixPlacement;

  @Input()
  public alignment: AffixAlignment;
}
