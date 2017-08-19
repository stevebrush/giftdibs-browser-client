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
      this.setUser(storage.user);
      this.token = storage.token;
    }
  }

  get user(): User {
    return this._user;
  }

  public setUser(value: User) {
    this._user = value;
    this.save();
    this.userSubject.next(value);
  }

  public modifyUser(partial: any) {
    Object.keys(partial).forEach((key: string) => {
      if (this._user.hasOwnProperty(key)) {
        (this._user as any)[key] = partial[key];
      }
    });
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
    this.save();
  }

  public clearAll(): void {
    this.setUser(undefined);
    this.token = undefined;
    localStorage.removeItem(this._storageKey);
  }

  public onUserChanges(): Observable<User> {
    return this.userSubject.asObservable();
  }

  public isCurrentUser(userId: string): boolean {
    return (this.user._id === userId);
  }

  private save(): void {
    const parsed = JSON.stringify({
      user: this.user,
      token: this.token
    });
    localStorage.setItem(this._storageKey, parsed);
  }
}
