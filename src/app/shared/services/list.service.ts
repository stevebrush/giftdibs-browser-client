import { Injectable } from '@angular/core';
import { Crudable } from '../crudable';
import { List } from '../list';

const LISTS: List[] = [
  {
    id: 1,
    name: 'Christmas 2017',
    isPrivate: false
  },
  {
    id: 2,
    name: 'Lego',
    isPrivate: false
  },
  {
    id: 3,
    name: 'Video Games',
    isPrivate: true
  }
];

@Injectable()
export class ListService implements Crudable<List> {
  getAll(): Promise<List[]> {
    return new Promise((resolve) => {
      resolve(LISTS);
    });
  }

  getById(id: number): Promise<List> {
    return new Promise((resolve) => {
      const found = LISTS.filter((list) => {
        return list.id === id;
      });
      resolve(found[0]);
    });
  }
}
