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
import { Product } from '../../../shared/model/product.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginLoading = false;
  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  constructor(
    private router: Router,
    private menuApi: MenuApi,
    private authApi: AuthApi,
    private client: ClientService,
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
    this.authApi.login(this.form.value)
      .pipe(finalize(() => { this.loginLoading = false; }))
      .subscribe(({ success, data }: any) => {
        if (success) {
          this.client.setUser = data;
          if (data.user.role === ROLE.ADMIN) {
            this.client.isAdmin = true;
            this.client.setHeaderButtons = ADMIN_BUTTONS;
            this.router.navigate(['/admin/add-product']);
          } else {
            this.getShopCard();
            this.client.isAdmin = false;
            this.client.setHeaderButtons = USER_BUTTONS;
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

  private getShopCard() {
    this.menuApi.getUserShopCard(this.client.getUser.user.userId).subscribe(({ success, data }: any) => {
      if (success && data) {
        const products: Product[] = JSON.parse(data.card.products);
        this.client.shopCardLength = products.length;
      }
    })
  }

}
