import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <h1>Welcome</h1>
    <p>
      <button class="btn btn-facebook btn-block">
        <i class="fa fa-facebook-official"></i>Log in with Facebook
      </button>
    </p>
    <form class="form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <div class="form-group">
        <label class="sr-only">Email address</label>
        <input class="form-control" formControlName="emailAddress" type="text" placeholder="Email address">
        <small class="help-block" [hidden]="isValid(form.controls.emailAddress)">
          Please provide a valid email address.
        </small>
      </div>
      <div class="form-group">
        <label class="sr-only">Password</label>
        <input class="form-control" formControlName="password" type="password" placeholder="Password">
        <small class="help-block" [hidden]="isValid(form.controls.password)">
          Password must be at least 7 characters.
        </small>
      </div>
      <div class="btn-group">
        <button class="btn btn-primary btn-block" type="submit" [disabled]="!form.valid || isSubmitted">Log in</button>
      </div>
      <div style="text-align:center;">
        <a class="btn btn-link" routerLink="/auth/forgotten">Forgot?</a>
        <a class="btn btn-link" routerLink="/auth/register">Sign up</a>
      </div>
    </form>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.defineFormFields();
  }

  isValid(field: any): boolean {
    return field.valid || (field.pristine && !this.isSubmitted);
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    this.isSubmitted = true;
  }

  // Define the form fields.
  private defineFormFields(): void {
    this.form = this.formBuilder.group({
      emailAddress: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required, Validators.minLength(7)]]
    });
  }
}
