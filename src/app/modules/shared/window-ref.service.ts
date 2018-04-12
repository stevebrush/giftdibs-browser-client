import { Injectable } from '@angular/core';

@Injectable()
export class WindowRefService {
  public getWindow() {
    return window;
  }
}
