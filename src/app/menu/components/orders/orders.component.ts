import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ClientService } from '../../../shared/service/client.service';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../shared/model/product.model';
import { Router } from '@angular/router';
import { ShopCard } from '../../../shared/model/shop-card.model';
import moment from 'jalali-moment';
import { ORDER_STATUS } from '../../../shared/enum/order-status.enum';
import { AdminApi } from '../../../admin/shared/admin.api';
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  selectedIndex = -1;
  private _orders$ = new BehaviorSubject<any[]>([]);
  public get orders() { return this._orders$.getValue() }

  tabsBadge = {
    all: 0,
    waiting: 0,
    sent: 0,
    confirmed: 0,
    notDelivered: 0,
  }

  constructor(
    private router: Router,
    private menuApi: MenuApi,
    private adminApi: AdminApi,
    private client: ClientService,
    private message: NzMessageService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(status?: number) {
    this.selectedIndex = status != undefined ? status : -1;
    const { userId } = this.client.getUser.user
    this.menuApi.getOrders({ userId, status }).subscribe(({ success, data }: any) => {
      if (!success) return;
      const mapped = data.userAllOrders.map((el: any) => {
        return {
          ...el,
          showNotReceived: this.showNotReceived(el.date),
          products: JSON.parse(el.products),
          totalPrice: this.getTotalPrice(JSON.parse(el.products)),
          date: moment(new Date(el.date)).locale('fa').format('HH:mm:ss YYYY/MM/DD'),
        }
      })
      if (this.selectedIndex == -1) {
        this.tabsBadge = {
          all: mapped.length,
          waiting: mapped.filter((e: any) => e.status === ORDER_STATUS.PAID).length,
          sent: mapped.filter((e: any) => e.status === ORDER_STATUS.SENT_VIA_POST).length,
          confirmed: mapped.filter((e: any) => e.status === ORDER_STATUS.DELIVERED).length,
          notDelivered: mapped.filter((e: any) => e.status === ORDER_STATUS.NOT_DELIVERED).length,
        }
      }
      this._orders$.next(mapped)
    })
  }

  showNotReceived(date: number): boolean {
    return date > new Date().getTime() - (3 * 24 * 60 * 60 * 1000);
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

}
