import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuApi } from '../../menu/shared/menu.api';
import { ClientService } from '../../shared/service/client.service';
import { MenuService } from '../../menu/shared/service/menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  constructor(
    private router: Router,
    private menuApi: MenuApi,
    private client: ClientService,
    private menuService: MenuService) {
    if (this.router.url === '/')
      this.router.navigate(['menu/landing'])
  }

  ngOnInit(): void {
    this.getShopCardLength()
    this.getSearchHistory()
  }

  private getShopCardLength() {
    if (!this.client.isLogin || this.client.isAdmin) return;
    this.menuApi.getUserShopCardLength(this.client.getUser.user.userId).subscribe(({ success, data }: any) => {
      if (success && data) {
        this.client.shopCardLength = data;
      }
    })
  }

  private getSearchHistory() {
    if (this.client.isLogin)
      this.menuApi.getSearchHistory(this.client.getUser.user.userId).subscribe(({ data }: any) => {
        this.menuService.setHeaderSearchHistory = data.history;
      })
  }
}
