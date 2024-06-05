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

  constructor(
    public client: ClientService,
    private router: Router,
    private translate: TranslateService,
    private message: NzMessageService
  ) { }

  logout_onClick() {
    this.client.setUser = null;
    this.router.navigate(['auth/login'])
    this.message.create('success', this.translate.instant('logoutSuccess'))
  }

  profile_onClick() { }

  aboutUs_onClick() {
    this.router.navigate(['admin'])
  }
  
  login_onClick() {
    this.router.navigate(['auth/login'])
  }

}
