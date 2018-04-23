import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  Router
} from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AlertService } from '../alert/alert.service';
import { DropdownMenuService } from '../dropdown-menu/dropdown-menu.service';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { OverlayInstance } from '../overlay/overlay-instance';
import { SessionService } from '../session/session.service';
import { SessionUser } from '../session/session-user';

@Component({
  selector: 'gd-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {
  public sessionUser: SessionUser;
  public routes: {
    path: string[];
    name: string;
  }[];

  @ViewChild('button')
  public buttonRef: ElementRef;

  private overlayInstance: OverlayInstance<DropdownMenuComponent>;
  private ngUnsubscribe = new Subject();

  constructor(
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef,
    private dropdownMenuService: DropdownMenuService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  public ngOnInit() {
    this.sessionService.userStream
      .takeUntil(this.ngUnsubscribe)
      .subscribe((sessionUser: SessionUser) => {
        this.sessionUser = sessionUser;
        this.changeDetector.markForCheck();
      });

    this.routes = [
      {
        name: 'GiftDibs',
        path: ['/']
      }
    ];
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public isLoggedIn(): boolean {
    return this.sessionService.isLoggedIn;
  }

  public openMenu() {
    if (this.overlayInstance) {
      this.overlayInstance.componentInstance.close();
      this.overlayInstance = undefined;
      return;
    }

    this.overlayInstance = this.dropdownMenuService.open({
      alignment: 'right',
      caller: this.buttonRef,
      items: [
        {
          label: 'Settings',
          action: () => {
            this.router.navigate(['/account', 'settings']);
          },
          addSeparatorAfter: true
        },
        {
          label: 'Log out',
          action: () => {
            this.logout();
          }
        }
      ]
    });

    this.overlayInstance.destroyStream.subscribe(() => {
      this.overlayInstance = undefined;
    });
  }

  private logout() {
    this.sessionService.clearAll();
    this.alertService.info('You have been successfully logged out.', true);
    this.router.navigate(['/account', 'login']);
  }
}
