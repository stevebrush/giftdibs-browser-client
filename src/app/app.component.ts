import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header class="header">
      <div class="container">
        <a routerLink="/home" class="brand">GiftDibs</a>
        <nav class="menu">
          <a routerLink="/auth/login">Log in</a>
        </nav>
      </div>
    </header>
    <div id="main">
      <div class="container">
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer id="footer">
      <div class="container">
        GiftDibs &copy; 2017
        <nav>
          <ul class="menu menu-inline">
            <li><a [routerLink]="['support', 'about']">About</a></li>
            <li><a [routerLink]="['support', 'feedback']">Feedback</a></li>
            <li><a [routerLink]="['support', 'privacy']">Privacy</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
