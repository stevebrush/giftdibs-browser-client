import { Observable } from 'rxjs/Observable';

export interface Crudable<T> {
  getAll(): Observable<T[]>;
  getById(id: number): Observable<T>;
}
