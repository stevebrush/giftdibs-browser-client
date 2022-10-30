import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { SessionUser } from './session-user';

@Injectable()
export class SessionService implements OnDestroy {
  public userStream = new BehaviorSubject<SessionUser | undefined>(undefined);

  public get isLoggedIn(): boolean {
    return this.token !== undefined;
  }

  public get token(): string | undefined {
    return this._token;
  }

  public set token(value: string | undefined) {
    this._token = value;
    this.save();
  }

  public get user(): SessionUser | undefined {
    return this._user;
  }

  public set user(value: SessionUser | undefined) {
    this._user = value;
    this.userStream.next(this.user);
    this.save();
  }

  private storageKey = 'giftdibs.session';

  private _user: SessionUser | undefined;
  private _token: string | undefined;

  constructor() {
    const storage = JSON.parse(localStorage.getItem(this.storageKey) || '{}');

    if (storage) {
      if (storage.user && storage.token) {
        this.user = storage.user;
        this.token = storage.token;
      } else {
        this.clearAll();
      }
    }
  }

  public ngOnDestroy(): void {
    this.userStream.complete();
  }

  public clearAll(): void {
    this.user = undefined;
    this.token = undefined;
    localStorage.removeItem(this.storageKey);
  }

  public isSessionUser(userId: string): boolean {
    return this.user?.id === userId;
  }

  public patchUser(data: SessionUser): SessionUser {
    const user = this.user;

    if (!user) {
      return data;
    }

    for (const key in user) {
      const value: any = data[key as keyof SessionUser];
      if (value !== undefined) {
        (user as any)[key] = value;
      }
    }

    this.user = user;

    return this.user;
  }

  private save(): void {
    const parsed = JSON.stringify({
      user: this.user,
      token: this.token,
    });
    localStorage.setItem(this.storageKey, parsed);
  }
}
