import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  forgetLoading = false;
  form = new FormGroup({
    email: new FormControl()
  });

  constructor(private router: Router) { }

  forget_onClick() { }

  login_onClick() {
    this.router.navigate(['/auth/login'])
  }

  signup_onClick() {
    this.router.navigate(['/auth/signup'])
  }

}
