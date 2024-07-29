import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ViewportService } from '../../service/view-port.service';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MenuService } from '../../../menu/shared/service/menu.service';

const nz = [
  NzInputModule,
  NzBadgeModule,
  NzIconModule,
  NzDropDownModule,
]

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, CommonModule, nz],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @ViewChild('menu', { static: false }) menu: NzDropdownMenuComponent;
  showBurgerMenu = true;
  searchControl = new FormControl()

  constructor(
    private router: Router,
    public client: ClientService,
    public viewPort: ViewportService,
    private message: NzMessageService,
    private menuService: MenuService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.menuService.headerSearchAsObs.subscribe((v: string) => this.searchControl.setValue(v));
  }

  logout_onClick() {
    this.client.logout();
    this.router.navigate(['menu/landing']);
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
}
