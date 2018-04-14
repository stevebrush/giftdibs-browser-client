import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import { TypeaheadSearchFunction } from '../typeahead/typeahead-search-function';
import { User } from '../../lazy/users/user';

import { SearchService } from './search.service';

let autoIncrementedId = 0;

@Component({
  selector: 'gd-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  public elementId: number;
  public searchFunction: TypeaheadSearchFunction<User>;

  constructor(
    private searchService: SearchService
  ) {
    autoIncrementedId++;
    this.elementId = autoIncrementedId;
    this.searchFunction = (searchText: string) => {
      return this.searchService.searchUsers(searchText);
    };
  }

  public ngOnInit() { }
}
