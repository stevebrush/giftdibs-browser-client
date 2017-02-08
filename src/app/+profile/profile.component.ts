import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  template: `
    <h1>{{user.firstName}} {{user.lastName}}</h1>
    <router-outlet></router-outlet>
    <nav>
      <ul class="menu menu-inline">
        <li><button (click)="goToRelative('profile')">Profile</button></li>
        <li><button (click)="goToRelative('dibs')">Dibs</button></li>
      </ul>
    </nav>
  `,
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {
    id: 1,
    firstName: 'Steve',
    lastName: 'Brush'
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() { }

  goToRelative(route: string = '/'): void {
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }
}
