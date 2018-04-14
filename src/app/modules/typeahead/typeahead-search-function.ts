import { Observable } from 'rxjs/Observable';

export type TypeaheadSearchFunction<T> = (searchText: string) => Observable<T[]>;
