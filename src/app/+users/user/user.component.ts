import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  template: `
    <h1>{{user.firstName}} {{user.lastName}}</h1>
    <nav style="margin-bottom: 20px;">
      <ul class="menu menu-buttons">
        <li>
          <button class="btn" [routerLink]="['lists']">Lists</button>
        </li>
        <li>
          <button class="btn" [routerLink]="['dibs']">Dibs</button>
        </li>
        <li>
          <button class="btn" [routerLink]="['friends']">Friends</button>
        </li>
        <li>
          <button class="btn" [routerLink]="['/settings']">
            <i class="fa fa-cog icon-only"></i>
            <span class="sr-only">Settings</span>
          </button>
        </li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class UserComponent implements OnInit {
  user: any = {
    id: 1,
    firstName: 'Steve',
    lastName: 'Brush'
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() { }

  goToRelative(route = '/'): void {
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }
}
