import {
  Injectable
} from '@angular/core';

import {
  UrlScraperResult
} from './url-scraper-result';

@Injectable()
export class UrlImagesSelectorContext {
  public product: UrlScraperResult;
}
