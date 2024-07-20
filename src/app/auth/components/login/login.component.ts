import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApi } from '../../shared/auth.api';
import { finalize } from 'rxjs';
import { ClientService } from '../../../shared/service/client.service';
import { TranslateService } from "@ngx-translate/core";
import { ROLE } from '../../../shared/enum/role.enum';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ADMIN_BUTTONS, USER_BUTTONS } from '../../../shared/config/header-buttons.config';
import { MenuApi } from '../../../menu/shared/menu.api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  passwordIsVisible = false;
  passwordInputType = 'password'
  loginLoading = false;
  form = new FormGroup({
    emailOrPhone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private router: Router,
    private menuApi: MenuApi,
    private authApi: AuthApi,
    private client: ClientService,
    private message: NzMessageService,
    private translate: TranslateService,
  ) { }

  forgetPassword_onClick() {
    this.router.navigate(['/auth/forget-password'])
  }

  register_onClick() {
    this.router.navigate(['/auth/signup'])
  }

  login_onClick() {
    this.loginLoading = true;
    const model = {
      ...this.form.value,
      emailOrPhone: this.form.value.emailOrPhone.toLowerCase(),
      password: this.form.value.password.toLowerCase(),
    }
    this.authApi.login(model)
      .pipe(finalize(() => { this.loginLoading = false; }))
      .subscribe(({ success, data }: any) => {
        if (success) {
          this.client.setUser = data;
          if (data.user.role === ROLE.ADMIN) {
            this.client.isAdmin = true;
            this.client.setHeaderButtons = ADMIN_BUTTONS;
            this.router.navigate(['/admin/orders']);
          } else {
            this.getShopCardLength();
            this.client.isAdmin = false;
            this.client.setHeaderButtons = USER_BUTTONS;
            this.router.navigate(['/menu/categories']);
            if (localStorage.getItem('routeAfterLogin')) {
              this.router.navigate([localStorage.getItem('routeAfterLogin')])
              localStorage.removeItem('routeAfterLogin')
            }
          }
          this.message.create(
            'success',
            this.translate.instant('loginSuccess')
          );
        }
      })
  }

  private getShopCardLength() {
    this.menuApi.getUserShopCardLength(this.client.getUser.user.userId).subscribe(({ success, data }: any) => {
      if (success && data) {
        this.client.shopCardLength = data;
      }
    })
  }
}
