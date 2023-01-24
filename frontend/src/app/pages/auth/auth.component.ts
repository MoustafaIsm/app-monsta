import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  error: string = '';

  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router, private authService: AuthService) { }

  onFormSubmit() {
    // Check if form is valid
    if (this.authForm.valid) {
      // Get form values
      const { email, password } = this.authForm.value;
      // Call login method
      if (email && password) {
        this.authService.login(email, password).subscribe({
          next: (data) => {
            // Check if user found
            if (data !== 'User not found') {
              // User found
              this.openHome();
            } else {
              // User not found
              this.error = 'User not found';
            }
          },
          error: (err) => {
            console.log(err);
          }
        });
      }

    } else {
      // Form is invalid
      console.log('Form is invalid');
    }
  }

  openHome() {
    this.router.navigate(['/home']);
  }

}
