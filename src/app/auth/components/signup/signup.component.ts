import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApi } from '../../shared/auth.api';
import { finalize } from 'rxjs';
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupLoading = false
  form = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    phone: new FormControl(),
    name: new FormControl()
  })

  constructor(
    private router: Router,
    private authApi: AuthApi,
    private message: NzMessageService,
    private translate: TranslateService,
  ) { }


  signup_onClick() {
    if (this.form.invalid) {
      this.message.create('error', this.translate.instant('formInvalid'))
      return;
    }
    this.signupLoading = true;
    this.authApi.signup(this.form.value)
      .pipe(finalize(() => { this.signupLoading = false; }))
      .subscribe(({ success }: any) => {
        if (success) {
          this.router.navigate(['/auth/login']);
          this.message.create(
            'success',
            this.translate.instant('signUpSuccess')
          );
        }
      })
  }

  login_onClick() {
    this.router.navigate(['/auth/login'])
  }
}
