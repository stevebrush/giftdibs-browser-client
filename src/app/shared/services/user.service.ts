import { Injectable } from '@angular/core';
import { Crudable } from '../crudable';
import { User } from '../user';

const USERS: User[] = [
  {
    id: 1,
    firstName: 'Steve',
    lastName: 'Brush',
    thumbnail: '/assets/images/sample/steve.jpg',
    birthday: 'August 30',
    followers: [
      {
        id: 2,
        firstName: 'David',
        lastName: 'Barnes',
        thumbnail: '/assets/images/sample/david.jpg'
      }
    ],
    following: [
      {
        id: 2,
        firstName: 'David',
        lastName: 'Barnes',
        thumbnail: '/assets/images/sample/david.jpg'
      }
    ],
    lists: [
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
    ]
  },
  {
    id: 2,
    firstName: 'David',
    lastName: 'Barnes',
    thumbnail: '/assets/images/sample/david.jpg',
    birthday: 'September 2',
    followers: [
      {
        id: 1,
        firstName: 'Steve',
        lastName: 'Brush',
        thumbnail: '/assets/images/sample/steve.jpg'
      }
    ],
    following: [],
    lists: []
  }
];

@Injectable()
export class UserService implements Crudable<User> {
  getAll(): Promise<User[]> {
    return new Promise(resolve => resolve(USERS));
  }

  getById(id: number): Promise<User> {
    return new Promise(resolve => {
      const found = USERS.filter(u => u.id === id);
      resolve(found[0]);
    });
  }
}
