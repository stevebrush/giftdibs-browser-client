import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div class="card">
      <h1>Welcome.</h1>
      <p>
        <button class="btn btn-facebook btn-block"><i class="fa fa-facebook-official"></i>Log in with Facebook</button>
      </p>
      <form class="form">
        <div class="form-group">
          <label class="sr-only">Email address</label>
          <input class="form-control" type="text" placeholder="Email address">
        </div>
        <div class="form-group">
          <label class="sr-only">Password</label>
          <input class="form-control" type="password" placeholder="Password">
        </div>
        <div class="btn-group">
          <button class="btn btn-primary btn-block">Log in</button>
        </div>
        <div style="text-align:center;">
          <a class="btn btn-link" routerLink="/auth/forgotten">Forgot?</a>
          <a class="btn btn-link" routerLink="/auth/register">Sign up</a>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor() { }

  public ngOnInit() {
  }
}
