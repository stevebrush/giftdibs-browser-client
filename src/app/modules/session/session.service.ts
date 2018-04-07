import {
  Injectable,
  OnDestroy
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SessionUser } from './session-user';

@Injectable()
export class SessionService implements OnDestroy {
  public userStream = new BehaviorSubject<SessionUser>({} as any);

  public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    this._token = value;
    this.save();
  }

  public get user(): SessionUser {
    console.log('get user:', this._user);
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

  public ngOnDestroy() {
    this.userStream.complete();
  }

  public clearAll(): void {
    this.user = undefined;
    this.token = undefined;
    localStorage.removeItem(this.storageKey);
  }

  public isCurrentUser(userId: string): boolean {
    return (this.user._id === userId);
  }

  public get isLoggedIn(): boolean {
    return (this.token !== undefined);
  }

  public patchUser(data: SessionUser): SessionUser {
    const user = this.user;
    Object.keys(user).forEach((key: keyof SessionUser) => {
      console.log('patch:', data, key, data[key]);
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
    this.userStream.next(this.user);
  }
}
