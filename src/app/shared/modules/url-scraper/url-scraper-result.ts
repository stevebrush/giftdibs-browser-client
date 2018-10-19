import { UrlScraperResultImage } from './url-scraper-result-image';

export interface UrlScraperResult {
  images?: UrlScraperResultImage[];
  name?: string;
  price?: number;
  url?: string;
}
