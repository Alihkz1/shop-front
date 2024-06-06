import { Component } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { TranslateModule } from "@ngx-translate/core";
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { ROLE } from '../../enum/role.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  afterLoginButtons = [];

  constructor(
    private router: Router,
    public client: ClientService,
    private message: NzMessageService,
    private translate: TranslateService,
  ) { }

  logout_onClick() {
    this.client.logout();
    this.router.navigate(['menu/categories'])
    this.message.create('success', this.translate.instant('logoutSuccess'))
  }

  profile_onClick() {
    if (this.client.getUser.user.role === ROLE.ADMIN)
      this.router.navigate(['admin/profile'])
    else
      this.router.navigate(['menu/profile'])
  }

  aboutUs_onClick() {
    this.router.navigate(['menu/about-us'])
  }

  login_onClick() {
    this.router.navigate(['auth/login'])
  }

  navigate(route: string) {
    this.router.navigate([route])
  }

}
