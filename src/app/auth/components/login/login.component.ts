import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { finalize } from 'rxjs';
import { ClientService } from '../../../shared/service/client.service';
import { TranslateService } from "@ngx-translate/core";
import { ROLE } from '../../../shared/enum/role.enum';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginLoading = false;
  emailControl = new FormControl(null, Validators.required)
  passwordControl = new FormControl(null, Validators.required)

  constructor(
    private router: Router,
    private authService: AuthService,
    private clientService: ClientService,
    private translate: TranslateService,
    private message: NzMessageService
  ) { }

  forgetPassword_onClick() {
    this.router.navigate(['/auth/forget-password'])
  }

  register_onClick() {
    this.router.navigate(['/auth/signup'])
  }

  login_onClick() {
    this.loginLoading = true;
    this.authService.login(
      {
        email: this.emailControl.value,
        password: this.passwordControl.value
      }
    )
      .pipe(finalize(() => { this.loginLoading = false; }))
      .subscribe(({ success, data }: any) => {
        if (success) {
          this.clientService.setUser = data.user;
          if (data.user.role === ROLE.ADMIN) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/menu/categories']);
          }
          this.message.create(
            'success',
            this.translate.instant('loginSuccess')
          );
        } else {
          this.message.create(
            'error',
            this.translate.instant('loginFailed')
          );
        }
      })
  }

}
