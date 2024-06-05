import { Component } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { TranslateModule } from "@ngx-translate/core";
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  /* todo: dynamic buttons for logged-in and signup */
  /* todo: dynamic buttons for customer and admin*/

  constructor(
    private router: Router,
    public client: ClientService,
    private message: NzMessageService,
    private translate: TranslateService,
  ) { }

  logout_onClick() {
    this.client.setUser = null;
    this.router.navigate(['auth/login'])
    this.message.create('success', this.translate.instant('logoutSuccess'))
  }

  profile_onClick() {
    this.router.navigate(['admin/profile'])
  }

  aboutUs_onClick() {
    this.router.navigate(['admin'])
  }

  login_onClick() {
    this.router.navigate(['auth/login'])
  }

}
