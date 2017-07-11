import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
