import { Component } from '@angular/core';
import { AuthenticationService } from '../auth.service';

@Component({
  selector: 'app-signup',
  template: ` <div class="authBlock">
    <h3>Sign Up</h3>
    <div class="formGroup">
      <input
        type="text"
        class="formControl"
        placeholder="Username"
        #userEmail
        required
      />
    </div>
    <div class="formGroup">
      <input
        type="password"
        class="formControl"
        placeholder="Password"
        #userPassword
        required
      />
    </div>
    <div class="formGroup">
      <input
        type="button"
        class="btn btnPrimary"
        value="Sign Up"
        (click)="
          authenticationService.SignUp(userEmail.value, userPassword.value)
        "
      />
    </div>
  </div>`,
})
export class SignupComponent {
  constructor(public authenticationService: AuthenticationService) {}
}