import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ClientService } from '../../../shared/service/client.service';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../shared/model/product.model';
import { Router } from '@angular/router';
import { ShopCard } from '../../../shared/model/shop-card.model';
import moment from 'jalali-moment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  selectedIndex = 3;
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

  getOrders(status?: number) {
    this.selectedIndex = status != undefined ? status : 3;
    const { userId } = this.client.getUser.user
    this.menuApi.getOrders({ userId, status }).subscribe(({ success, data }: any) => {
      if (!success) return;
      const mapped = data.userAllOrders.map((el: any) => {
        return {
          ...el,
          products: JSON.parse(el.products),
          totalPrice: this.getTotalPrice(JSON.parse(el.products)),
          date: moment(new Date(el.date)).locale('fa').format('HH:mm:ss YYYY/MM/DD'),
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
