import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor() { }

  onFormSubmit() {
    // Check if form is valid
    if (this.authForm.valid) {
      // Get form values
      const { email, password } = this.authForm.value;
      console.log('Form values', email, password);
    } else {
      // Form is invalid
      console.log('Form is invalid');
    }
  }

}
