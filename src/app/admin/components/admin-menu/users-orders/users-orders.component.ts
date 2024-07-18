import { Component, OnInit } from '@angular/core';
import { AdminApi } from '../../../shared/admin.api';
import { BehaviorSubject, Subscription } from 'rxjs';
import moment from 'jalali-moment';
import { Product } from '../../../../shared/model/product.model';
import { Router } from '@angular/router';
import { ORDER_STATUS } from '../../../../shared/enum/order-status.enum';
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from 'ng-zorro-antd/message';
import { OrderDto, OrderProduct } from '../../../../shared/model/order-dto.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PostTrackCodeModalComponent } from '../../../../shared/component/post-track-code-modal/post-track-code-modal.component';

@Component({
  selector: 'app-users-orders',
  templateUrl: './users-orders.component.html',
  styleUrl: './users-orders.component.scss'
})
export class UsersOrdersComponent implements OnInit {
  selectedIndex = 0;
  dataLoading: Subscription;

  tabsBadge = {
    all: 0,
    waiting: 0,
    sent: 0,
    confirmed: 0,
    notDelivered: 0,
  }

  private _orders$ = new BehaviorSubject<OrderDto[]>([]);
  public get orders(): OrderDto[] { return this._orders$.getValue() }

  constructor(
    private router: Router,
    private adminApi: AdminApi,
    private message: NzMessageService,
    private modalService: NzModalService,
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

  openPostTrackCodeModal(orderId: number) {
    this.modalService.create({
      nzFooter: null,
      nzCentered: true,
      nzClosable: false,
      nzStyle: {
        width: "500px",
        borderRadius: "6px",
      },
      nzContent: PostTrackCodeModalComponent,
      nzData: { orderId },
      nzOnOk: () => {
      },
    }).afterClose.subscribe((result: boolean) => {
      if (result) {
        this.message.create('success', this.translate.instant('actionDone'))
        this.getOrders()
      }
    })
  }

  getProductImage(product: Product) {
    return JSON.parse(product.imageUrl)[product.primaryImageIndex]
  }
}
