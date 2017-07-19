import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../_models';

@Injectable()
export class SessionService {
  private _user: User;
  private _token: string;
  private _storageKey = 'giftdibs.session';

  private userSubject = new BehaviorSubject<User>(undefined);

  constructor() {
    const storage = JSON.parse(localStorage.getItem(this._storageKey));
    if (storage) {
      this.userSubject = new BehaviorSubject<User>(storage.user);
      this.user = storage.user;
      this.token = storage.token;
    }
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
    this.save();
    this.userSubject.next(value);
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
    this.save();
  }

  public clearAll(): void {
    this.user = undefined;
    this.token = undefined;
    localStorage.removeItem(this._storageKey);
  }

  public onUserChanges(): Observable<User> {
    return this.userSubject.asObservable();
  }

  private save(): void {
    const parsed = JSON.stringify({
      user: this.user,
      token: this.token
    });
    localStorage.setItem(this._storageKey, parsed);
  }
}
