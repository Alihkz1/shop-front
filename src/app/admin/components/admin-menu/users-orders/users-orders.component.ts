import { Component, OnInit } from '@angular/core';
import { AdminApi } from '../../../shared/admin.api';
import { BehaviorSubject, Subscription } from 'rxjs';
import moment from 'jalali-moment';
import { ShopCard } from '../../../../shared/model/shop-card.model';
import { Product } from '../../../../shared/model/product.model';
import { Router } from '@angular/router';
import { ORDER_STATUS } from '../../../../shared/enum/order-status.enum';
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-users-orders',
  templateUrl: './users-orders.component.html',
  styleUrl: './users-orders.component.scss'
})
export class UsersOrdersComponent implements OnInit {
  selectedIndex = -1;
  dataLoading: Subscription;

  tabsBadge = {
    all: 0,
    waiting: 0,
    sent: 0,
    confirmed: 0,
    notDelivered: 0,
  }

  private _orders$ = new BehaviorSubject<any[]>([]);
  public get orders() { return this._orders$.getValue() }

  constructor(
    private router: Router,
    private adminApi: AdminApi,
    private message: NzMessageService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders() {
    this.dataLoading = this.adminApi.getAllOrders({}).subscribe(({ success, data }: any) => {
      if (!success) return;

      const mapped = data.allOrders.map((el: any) => {
        return {
          ...el,
          products: JSON.parse(el.products),
          totalPrice: this.getTotalPrice(JSON.parse(el.products)),
          date: moment(new Date(el.date)).locale('fa').format('HH:mm:ss YYYY/MM/DD'),
        }
      })

      this.tabsBadge = {
        all: mapped.length,
        waiting: mapped.filter((e: any) => e.status === ORDER_STATUS.PAID).length,
        sent: mapped.filter((e: any) => e.status === ORDER_STATUS.SENT_VIA_POST).length,
        confirmed: mapped.filter((e: any) => e.status === ORDER_STATUS.DELIVERED).length,
        notDelivered: mapped.filter((e: any) => e.status === ORDER_STATUS.NOT_DELIVERED).length,
      }

      const ordersData = this.selectedIndex != -1 ? mapped.filter((e: any) => e.status === this.selectedIndex) : mapped;


      this._orders$.next(ordersData)
    })
  }

  changeStatus(order: any, status: ORDER_STATUS) {
    this.adminApi.changeOrderStatus(
      {
        orderId: order.orderId,
        orderStatus: status
      }
    ).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
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
