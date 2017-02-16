export interface Crudable<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;
}