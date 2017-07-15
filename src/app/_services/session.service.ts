import { Injectable } from '@angular/core';

import { User } from '../_models';

@Injectable()
export class SessionService {
  private _user: User;
  private _token: string;
  private _storageKey = 'giftdibs.session';

  constructor() {
    const storage = JSON.parse(localStorage.getItem(this._storageKey));
    if (storage) {
      this._user = storage.user;
      this._token = storage.token;
    }
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
    this.save();
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
    this.save();
  }

  public clearAll(): void {
    localStorage.removeItem(this._storageKey);
  }

  private save(): void {
    const parsed = JSON.stringify({
      user: this.user,
      token: this.token
    });
    localStorage.setItem(this._storageKey, parsed);
  }
}
