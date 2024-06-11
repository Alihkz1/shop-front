import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApi } from '../../shared/auth.api';
import { finalize } from 'rxjs';
import { TranslateService } from "@ngx-translate/core";
import { ClientService } from '../../../shared/service/client.service';
import { NzMessageService } from 'ng-zorro-antd/message';


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
    name: new FormControl()
  })

  constructor(
    private router: Router,
    private authApi: AuthApi,
    private message: NzMessageService,
    private translate: TranslateService,
    private clientService: ClientService,
  ) { }


  signup_onClick() {
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
        } else {
          this.message.create(
            'error',
            this.translate.instant('signUpFailed')
          );
        }
      })
  }

  login_onClick() {
    this.router.navigate(['/auth/login'])
  }
}
