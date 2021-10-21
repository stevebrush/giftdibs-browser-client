import {
  ChangeDetectionStrategy,
  Component,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'gd-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2) {}

  public ngOnInit(): void {
    // Custom styles for the welcome page.
    this.renderer.addClass(document.body, 'app-page-welcome');
  }

  public ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'app-page-welcome');
  }
}
