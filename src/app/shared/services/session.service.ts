import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  user: any = {
    id: 1,
    firstName: 'Steve',
    lastName: 'Brush',
    thumbnail: '/assets/images/sample/steve.jpg'
  };

  getUser(): any {
    return this.user;
  }
}
