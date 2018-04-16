import { Injectable } from '@angular/core';

@Injectable()
export class WindowRefService {
  public get nativeWindow() {
    return window;
  }
}
