import {
  Component, ElementRef
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import 'rxjs/add/operator/first';

import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  public registerForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {
    this.createForm();
  }

  public register(): void {
    this.registrationService
      .register(this.registerForm.value)
      .subscribe(
        (result: any) => {
          alert(result.message);
          this.router.navigate(['/login']);
        },
        (err: any) => {
          const error = err.error;
          console.log('errors?', error);

          if (error.code === 108) {
            this.router.navigate(['/page-not-found']);
            return;
          }

          alert(error.message);
        }
      );
  }

  public togglePasswordInputType(input: HTMLInputElement) {
    if (input.type === 'text') {
      input.type = 'password';
    } else {
      input.type = 'text';
    }
  }

  private createForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl(null, [
        Validators.required
      ]),
      lastName: new FormControl(null, [
        Validators.required
      ]),
      gdNickname: null,
      emailAddress: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }
}
