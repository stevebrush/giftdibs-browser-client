import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import {
  WindowRefService
} from './modules';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(
    private windowService: WindowRefService
  ) { }

  public ngOnInit(): void {
    const FB = (this.windowService.nativeWindow as any).FB;

    FB.init({
      appId: '529193240473948',
      xfbml: false,
      version: 'v2.10'
    });
  }
}
