import { Component } from '@angular/core';
import { AuthenticationService } from '../auth.service';

@Component({
  selector: 'app-signin',
  template: ` <div class="authBlock">
    <h3>Sign In</h3>
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
        value="Sign In"
        (click)="
          authenticationService.SignIn(userEmail.value, userPassword.value)
        "
      />
    </div>
  </div>`,
})
export class SigninComponent {
  constructor(public authenticationService: AuthenticationService) {}
}