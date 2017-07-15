import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public currentUser: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  public ngOnInit(): void {
    const session = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = session.user;
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
