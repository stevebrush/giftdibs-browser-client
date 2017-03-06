import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  user: any = {
    id: 1
  };

  getUser(): any {
    return this.user;
  }
}
