import {
  Injectable,
  OnDestroy
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SessionUser } from './session-user';

@Injectable()
export class SessionService implements OnDestroy {
  public userStream = new BehaviorSubject<SessionUser>({} as any);

  public get isLoggedIn(): boolean {
    return (this.token !== undefined);
  }

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
    this.userStream.next(this.user);
    this.save();
  }

  private storageKey = 'giftdibs.session';

  private _user: SessionUser;
  private _token: string;

  constructor() {
    const storage = JSON.parse(localStorage.getItem(this.storageKey));

    if (storage) {
      if (storage.user && storage.token) {
        this.user = storage.user;
        this.token = storage.token;
      } else {
        this.clearAll();
      }
    }
  }

  public ngOnDestroy() {
    this.userStream.complete();
  }

  public clearAll(): void {
    this.user = undefined;
    this.token = undefined;
    localStorage.removeItem(this.storageKey);
  }

  public isSessionUser(userId: string): boolean {
    return (this.user._id === userId);
  }

  public patchUser(data: SessionUser): SessionUser {
    const user = this.user;
    Object.keys(user).forEach((key: keyof SessionUser) => {
      if (data[key] !== undefined) {
        user[key] = data[key];
      }
    });

    this.user = user;

    return this.user;
  }

  private save(): void {
    const parsed = JSON.stringify({
      user: this.user,
      token: this.token
    });
    localStorage.setItem(this.storageKey, parsed);
  }
}
