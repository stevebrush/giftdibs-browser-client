import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SessionUser } from './session-user';

@Injectable()
export class SessionService {
  public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    this._token = value;
    this.save();
  }

  public get user(): SessionUser {
    return this._user;
  }

  public set user(value: SessionUser) {
    this._user = value;
    this.save();
  }

  private storageKey = 'giftdibs.session';

  private _user: SessionUser;
  private _token: string;

  constructor() {
    const storage = JSON.parse(localStorage.getItem(this.storageKey));

    if (storage) {
      this.user = storage.user;
      this.token = storage.token;
    }
  }

  public clearAll(): void {
    this.user = undefined;
    this.token = undefined;
    localStorage.removeItem(this.storageKey);
  }

  public isCurrentUser(userId: string): boolean {
    return (this.user.id === userId);
  }

  private save(): void {
    const parsed = JSON.stringify({
      user: this.user,
      token: this.token
    });
    localStorage.setItem(this.storageKey, parsed);
  }
}
