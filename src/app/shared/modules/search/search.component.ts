import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  TypeaheadSearchFunction,
  TypeaheadSearchResultAction
} from '@app/ui';

import {
  User
} from '@app/shared/modules/user';

import { SearchService } from './search.service';

let autoIncrementedId = 0;

@Component({
  selector: 'gd-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    SearchService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  public elementId: number;

  constructor(
    private router: Router,
    private searchService: SearchService
  ) {
    autoIncrementedId++;
    this.elementId = autoIncrementedId;
  }

  public searchFunction: TypeaheadSearchFunction<User> = (searchText: string) => {
    return this.searchService.searchUsers(searchText);
  }

  public searchResultAction: TypeaheadSearchResultAction<User> = (searchResult: User) => {
    // Let the user name be returned to the typeahead input before navigating.
    setTimeout(() => {
      this.router.navigate(['/users', searchResult.id]);
    });
    return `${searchResult.firstName} ${searchResult.lastName}`;
  }
}
