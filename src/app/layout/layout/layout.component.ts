import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuApi } from '../../menu/shared/menu.api';
import { ClientService } from '../../shared/service/client.service';
import { Product } from '../../shared/model/product.model';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  constructor(private router: Router, private menuApi: MenuApi, private client: ClientService) {
    if (this.router.url === '/')
      this.router.navigate(['menu/categories'])
  }

  ngOnInit(): void {
    this.getShopCard()
  }

  private getShopCard() {
    if (!this.client.isLogin || this.client.isAdmin) return;
    this.menuApi.getUserShopCard(this.client.getUser.user.userId).subscribe(({ success, data }: any) => {
      if (success && data) {
        const products: Product[] = JSON.parse(data.card.products);
        this.client.shopCardLength = products.length;
      }
    })
  }
}
