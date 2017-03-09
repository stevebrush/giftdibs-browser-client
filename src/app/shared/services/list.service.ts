import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Crudable } from '../crudable';
import { List } from '../list';

const LISTS: List[] = [
  {
    id: 1,
    name: 'Christmas 2017',
    isPrivate: false,
    gifts: [
      {
        id: 1,
        name: 'DeWalt DCD790D2 20V MAX XR Lithium Ion Brushless Compact Drill Driver Kit',
        price: 125,
        thumbnail: '/assets/images/sample/dewalt.jpg',
        comments: []
      },
      {
        id: 2,
        name: 'Lego AT-ST 75153',
        price: 31,
        thumbnail: '/assets/images/sample/lego-atst.jpg',
        comments: []
      },
      {
        id: 3,
        name: 'Dark Souls 3 - PS4',
        price: 20,
        thumbnail: '/assets/images/sample/ds3-ps4.jpg',
        comments: []
      }
    ]
  },
  {
    id: 2,
    name: 'Lego',
    isPrivate: false,
    gifts: [
      {
        id: 2,
        name: 'Lego AT-ST 75153',
        price: 31,
        thumbnail: '/assets/images/sample/lego-atst.jpg',
        comments: []
      }
    ]
  },
  {
    id: 3,
    name: 'Video Games',
    isPrivate: true,
    gifts: [
      {
        id: 3,
        name: 'Dark Souls 3 - PS4',
        price: 20,
        thumbnail: '/assets/images/sample/ds3-ps4.jpg',
        comments: []
      }
    ]
  }
];

@Injectable()
export class ListService implements Crudable<List> {
  getAll(): Observable<List[]> {
    return new Observable(observer => observer.next(LISTS));
  }

  getById(id: number): Observable<List> {
    return new Observable(observer => {
      const found = LISTS.filter(list => list.id === id);
      observer.next(found[0]);
    });
  }
}
