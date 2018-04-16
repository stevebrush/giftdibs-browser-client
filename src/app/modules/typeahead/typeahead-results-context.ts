import {
  Injectable,
  TemplateRef
} from '@angular/core';

@Injectable()
export class TypeaheadResultsContext {
  public results: any[];
  public templateRef: TemplateRef<any>;
}
