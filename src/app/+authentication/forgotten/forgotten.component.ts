import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotten',
  template: `
    <h1>Find your account</h1>
    <p>Enter the email address associated with your GiftDibs.com account, and we'll send you a link to reset your password.</p>
    <form class="form">
      <div class="form-group">
        <label class="sr-only">Email address</label>
        <input class="form-control" type="email" autocomplete="off" placeholder="Your email address">
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block">Send request</button>
      </div>
      <div style="text-align: center">
        <a class="btn btn-link btn-block" routerLink="/auth/login">Go back to login</a>
      </div>
    </form>
  `
})
export class ForgottenComponent implements OnInit {
  constructor() { }
  ngOnInit() {}
}
