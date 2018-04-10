export type TypeaheadSearchFunction<T> = (searchText: string) => Promise<T[]>;
