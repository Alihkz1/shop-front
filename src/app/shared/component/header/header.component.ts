import { Component, ViewChild } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';
import { ROLE } from '../../enum/role.enum';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  NzDropDownModule,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, NzBadgeModule, NzIconModule, NzDropDownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('menu', { static: false }) menu: NzDropdownMenuComponent;
  showBurgerMenu = true;

  constructor(
    private router: Router,
    public client: ClientService,
    private message: NzMessageService,
    private translate: TranslateService
  ) {}

  logout_onClick() {
    this.client.logout();
    this.router.navigate(['menu/categories']);
    this.message.create('success', this.translate.instant('logoutSuccess'));
  }

  profile_onClick() {
    if (this.client.getUser.user.role === ROLE.ADMIN)
      this.router.navigate(['admin/profile']);
    else this.router.navigate(['menu/profile']);
  }

  contactUs_onClick() {
    this.router.navigate(['menu/about-us']);
  }

  login_onClick() {
    this.router.navigate(['auth/login']);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  navigateToShopCard() {
    this.router.navigate([`menu/card/${this.client.getUser.user.userId}`]);
  }

  burger_onClick() {
    this.showBurgerMenu = true;
  }

  isActiveRoute(route: string): boolean {
    const { url } = this.router;
    return url.startsWith('/' + route);
  }
}
