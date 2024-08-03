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
  NzDropdownMenuComponent,
  NzDropDownModule,
} from 'ng-zorro-antd/dropdown';
import { ViewportService } from '../../service/view-port.service';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MenuService } from '../../../menu/shared/service/menu.service';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { MenuApi } from '../../../menu/shared/menu.api';

const nz = [
  NzInputModule,
  NzBadgeModule,
  NzIconModule,
  NzDropDownModule,
  NzAutocompleteModule
]

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, CommonModule, nz],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('menu', { static: false }) menu: NzDropdownMenuComponent;
  showBurgerMenu = true;
  searchControl = new FormControl()

  constructor(
    private router: Router,
    public client: ClientService,
    public viewPort: ViewportService,
    private message: NzMessageService,
    public menuService: MenuService,
    public menuApi: MenuApi,
    private translate: TranslateService,
  ) { }


  logout_onClick() {
    this.client.logout();
    this.router.navigate(['menu/landing']);
    this.message.create('success', this.translate.instant('logoutSuccess'));
    this.menuService.setHeaderSearchHistory = [];
  }

  burger_onClick() {
    this.showBurgerMenu = true;
  }

  profile_onClick() {
    if (this.client.getUser.user.role === ROLE.ADMIN)
      this.router.navigate(['admin/profile']);
    else this.router.navigate(['menu/profile']);
  }

  contactUs_onClick() {
    this.router.navigate(['menu/about-us']);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  navigateToShopCard() {
    this.router.navigate([`menu/card/${this.client.getUser.user.userId}`]);
  }

  isActiveRoute(route: string): boolean {
    const { url } = this.router;
    if (route.includes('admin')) return url.includes('admin');
    else return url.includes('/' + route);
  }

  categoryIsActiveRoute(): boolean {
    const { url } = this.router;
    return url.includes('product') || url.includes('categories');
  }

  trackIsActiveRoute(): boolean {
    const { url } = this.router;
    return url.includes('track');
  }

  authIsActiveRoute(): boolean {
    const { url } = this.router;
    return url.includes('auth');
  }

  search_onClick() {
    this.router.navigate(['menu/search'], {
      queryParams: {
        q: this.searchControl.value
      }
    })
  }

  bottomSvgPath(buttonTitle: string): string {
    switch (buttonTitle) {
      case "myOrders":
        return 'assets/svg/users-orders.svg';
      case "products":
        return 'assets/svg/product-management.svg';
      case "saved":
        return 'assets/svg/bottom-saved.svg';
      case "contactUs":
        return 'assets/svg/all-comments.svg';
      case "trackOrder":
        return 'assets/svg/fast-post.svg';
      case "mainPage":
        return 'assets/svg/shop.svg';
      case "dashboard":
        return 'assets/svg/dashboard.svg';
      default:
        return ''
    }
  }

  public deleteHistoryItem_onClick(option: any) {
    this.menuApi.deleteSearchHistoryById(option.id)
      .subscribe(() => this.getSearchHistory())
  }

  private getSearchHistory() {
    if (this.client.isLogin)
      this.menuApi.getSearchHistory(this.client.getUser.user.userId).subscribe(({ data }: any) => {
        this.menuService.setHeaderSearchHistory = data.history;
      })
  }
}
