import { Injectable } from '@angular/core';
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
        thumbnail: '/assets/images/sample/dewalt.jpg'
      },
      {
        id: 2,
        name: 'Lego AT-ST 75153',
        price: 31,
        thumbnail: '/assets/images/sample/lego-atst.jpg'
      },
      {
        id: 3,
        name: 'Dark Souls 3 - PS4',
        price: 20,
        thumbnail: '/assets/images/sample/ds3-ps4.jpg'
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
        thumbnail: '/assets/images/sample/lego-atst.jpg'
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
        thumbnail: '/assets/images/sample/ds3-ps4.jpg'
      }
    ]
  }
];

@Injectable()
export class ListService implements Crudable<List> {
  getAll(): Promise<List[]> {
    return new Promise(resolve => resolve(LISTS));
  }

  getById(id: number): Promise<List> {
    return new Promise(resolve => {
      const found = LISTS.filter(list => list.id === id);
      resolve(found[0]);
    });
  }
}
