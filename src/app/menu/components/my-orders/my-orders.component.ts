import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Product } from '../../../shared/model/product.model';
import { Router } from '@angular/router';
import moment from 'jalali-moment';
import { ORDER_STATUS } from '../../../shared/enum/order-status.enum';
import { AdminApi } from '../../../admin/shared/admin.api';
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from 'ng-zorro-antd/message';
import { OrderDto, OrderProduct } from '../../../shared/model/order-dto.model';

@Component({
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit {
  selectedIndex = 0;
  private _orders$ = new BehaviorSubject<OrderDto[]>([]);
  public get orders(): OrderDto[] { return this._orders$.getValue() }
  dataLoading: Subscription;

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
    private message: NzMessageService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders() {
    this.dataLoading = this.menuApi.getOrders({}).subscribe(({ success, data }: any) => {
      if (!success) return;

      const mapped = data.orders.map((el: OrderDto) => {
        return {
          ...el,
          showNotReceived: this.showNotReceived(el.order.date),
          totalPrice: this.getTotalPrice(el.products),
          date: moment(new Date(el.order.date)).locale('fa').format('HH:mm:ss YYYY/MM/DD'),
        }
      })

      this.tabsBadge = {
        all: mapped.length,
        waiting: mapped.filter((e: OrderDto) => e.order.status === ORDER_STATUS.PAID).length,
        sent: mapped.filter((e: OrderDto) => e.order.status === ORDER_STATUS.SENT_VIA_POST).length,
        confirmed: mapped.filter((e: OrderDto) => e.order.status === ORDER_STATUS.DELIVERED).length,
        notDelivered: mapped.filter((e: OrderDto) => e.order.status === ORDER_STATUS.NOT_DELIVERED).length,
      }

      const ordersData = this.selectedIndex != -1 ? mapped.filter((e: OrderDto) => e.order.status === this.selectedIndex) : mapped;

      this._orders$.next(ordersData)
    })
  }

  showNotReceived(date: number): boolean {
    return date > new Date().getTime() - (10 * 24 * 60 * 60 * 1000);
  }

  getTotalPrice(products: OrderProduct[]) {
    let totalPrice = 0;
    products.forEach((p: OrderProduct) => {
      totalPrice += p.product.price * p.amount;
    });
    return totalPrice;
  }

  navigateToProduct(product: Product) {
    this.router.navigate(['menu/products', product.categoryId, product.productId])
  }

  changeStatus(orderId: number, status: ORDER_STATUS) {
    this.adminApi.changeOrderStatus(
      {
        orderId,
        orderStatus: status
      }
    ).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
        this.getOrders();
      }
    })
  }

  getProductImage(product: Product) {
    return JSON.parse(product.imageUrl)[product.primaryImageIndex]
  }
}
