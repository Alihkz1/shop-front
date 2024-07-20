import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApi } from '../../shared/auth.api';
import { finalize } from 'rxjs';
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from 'ng-zorro-antd/message';
import { ClientService } from '../../../shared/service/client.service';
import { USER_BUTTONS } from '../../../shared/config/header-buttons.config';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupLoading = false
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]),
    password: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^09\d{9}$/)
    ]),
    name: new FormControl()
  })

  constructor(
    private router: Router,
    private authApi: AuthApi,
    private client: ClientService,
    private message: NzMessageService,
    private translate: TranslateService,
  ) { }


  signup_onClick() {
    if (this.form.get('phone').hasError('pattern')) {
      this.message.create('error', this.translate.instant('wrongPhoneFormat'))
      return;
    }
    if (this.form.get('email').hasError('pattern')) {
      this.message.create('error', this.translate.instant('wrongEmailFormat'))
      return;
    }
    if (this.form.invalid) {
      this.message.create('error', this.translate.instant('formInvalid'))
      return;
    }
    this.signupLoading = true;
    const model = {
      ...this.form.value,
      email: this.form.value.email.toLowerCase(),
      password: this.form.value.password.toLowerCase(),
    }
    this.authApi.signup(model)
      .pipe(finalize(() => { this.signupLoading = false; }))
      .subscribe(({ success, data }: any) => {
        if (success) {
          this.client.setUser = data;
          this.client.isAdmin = false;
          this.client.setHeaderButtons = USER_BUTTONS;
          this.router.navigate(['/menu/categories']);
          this.message.create(
            'success',
            this.translate.instant('loginSuccess')
          );
        }
      })
  }

  login_onClick() {
    this.router.navigate(['/auth/login'])
  }
}
