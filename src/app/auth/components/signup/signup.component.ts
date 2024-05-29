import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupLoading = false
  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    phone: new FormControl(),
    fullName: new FormControl()
  })

  constructor(private router: Router) { }


  signup_onClick() {
    /* email - password - phone - name */
  }

  login_onClick() {
    this.router.navigate(['/auth/login'])
  }
}
