import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ClientService } from '../../../shared/service/client.service';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../shared/model/product.model';
import { Router } from '@angular/router';
import { ShopCard } from '../../../shared/model/shop-card.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private _orders$ = new BehaviorSubject<any[]>([]);
  public get orders() { return this._orders$.getValue() }

  constructor(
    private router: Router,
    private menuApi: MenuApi,
    private client: ClientService
  ) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders() {
    const { userId } = this.client.getUser.user
    this.menuApi.getOrders(userId).subscribe(({ success, data }: any) => {
      if (!success) return;
      const mapped = data.userAllOrders.map((el: any) => {
        return {
          ...el,
          products: JSON.parse(el.products),
          totalPrice: this.getTotalPrice(JSON.parse(el.products))
        }
      })
      this._orders$.next(mapped)
    })
  }

  getTotalPrice(products: ShopCard[]) {
    let totalPrice = 0;
    products.forEach((p) => {
      totalPrice += p.price * p.inCardAmount;
    });
    return totalPrice;
  }

  navigateToProduct(product: Product) {
    this.router.navigate(['menu/products', product.categoryId, product.productId])

  }
}
