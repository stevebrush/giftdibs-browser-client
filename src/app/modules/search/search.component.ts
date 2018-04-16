import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import { User } from '../../lazy/users/user';

import { TypeaheadSearchFunction } from '../typeahead/typeahead-search-function';

import { SearchService } from './search.service';

let autoIncrementedId = 0;

@Component({
  selector: 'gd-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  public elementId: number;

  constructor(
    private searchService: SearchService
  ) {
    autoIncrementedId++;
    this.elementId = autoIncrementedId;
  }

  public searchFunction: TypeaheadSearchFunction<User> = (searchText: string) => {
    return this.searchService.searchUsers(searchText);
  }
}
