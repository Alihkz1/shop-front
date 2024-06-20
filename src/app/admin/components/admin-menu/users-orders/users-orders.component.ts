import { Component, OnInit } from '@angular/core';
import { AdminApi } from '../../../shared/admin.api';
import { BehaviorSubject } from 'rxjs';
import moment from 'jalali-moment';
import { ShopCard } from '../../../../shared/model/shop-card.model';
import { Product } from '../../../../shared/model/product.model';
import { Router } from '@angular/router';
import { ORDER_STATUS } from '../../../../shared/enum/order-status.enum';

@Component({
  selector: 'app-users-orders',
  templateUrl: './users-orders.component.html',
  styleUrl: './users-orders.component.scss'
})
export class UsersOrdersComponent implements OnInit {
  private _orders$ = new BehaviorSubject<any[]>([]);
  public get orders() { return this._orders$.getValue() }

  constructor(private adminApi: AdminApi, private router: Router) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders() {
    this.adminApi.getAllOrders().subscribe(({ success, data }: any) => {
      if (!success) return;
      const mapped = data.allOrders.map((el: any) => {
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

  changeStatus(order: any, status: ORDER_STATUS) {
    this.adminApi.changeOrderStatus({
      orderId: order.orderId,
      orderStatus: status
    })
      .subscribe(({ success }: any) => {
        if (success) {
          this.getOrders();
        }
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
