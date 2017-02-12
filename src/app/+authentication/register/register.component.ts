import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  template: `
    <h1>Create a free account</h1>
    <p><button class="btn btn-facebook btn-block"><i class="fa fa-facebook-official"></i>Sign up with Facebook</button></p>
    <form class="form">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label class="sr-only">First name</label>
            <input class="form-control" type="text" autocomplete="off" placeholder="First name">
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="sr-only">Last name</label>
            <input class="form-control" type="text" autocomplete="off" placeholder="Last name">
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="sr-only">Email address</label>
        <input class="form-control" type="email" autocomplete="off" placeholder="Email address">
      </div>
      <div class="form-group">
        <label class="sr-only">Retype email address</label>
        <input class="form-control" type="email" autocomplete="off" placeholder="Retype email address">
      </div>
      <div class="form-group">
        <label class="sr-only">Password</label>
        <input class="form-control" type="password" autocomplete="off" placeholder="Password">
      </div>
      <div class="form-group">
        <label>Birthday</label>
        <div class="form-control-inline-group">
          <select class="form-control form-control-inline">
            <option>January</option>
          </select>
          <input class="form-control form-control-inline" type="number" placeholder="Day">
          <input class="form-control form-control-inline" type="number" placeholder="Year">
        </div>
      </div>
      <div class="form-group">
        <label class="sr-only">Gender</label>
        <select class="form-control">
          <option>I am...</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>
      <p>
        By submitting this form you are agreeing to our <a routerLink="/privacy">Privacy Policy</a> and <a routerLink="/terms">Terms</a>.
      </p>
      <div class="form-group">
        <button class="btn btn-primary btn-block">Sign up</button>
      </div>
      <div style="text-align:center;">
        <a class="btn btn-link" routerLink="/auth/login">I already have an account.</a>
      </div>
    </form>
  `
})
export class RegisterComponent implements OnInit {
  constructor() { }
  ngOnInit() {}
}
