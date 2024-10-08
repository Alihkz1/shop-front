import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuApi } from '../../shared/menu.api';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Product } from '../../../shared/model/product.model';
import moment from 'jalali-moment';
import { OrderDto, OrderProduct } from '../../../shared/model/order-dto.model';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.scss'
})
export class TrackOrderComponent {
  trackLoading: Subscription;

  orderCodeControl = new FormControl();
  private _order$ = new BehaviorSubject<OrderDto>(null);
  public get order(): OrderDto { return this._order$.getValue() }

  orderNotFound = false;

  constructor(private router: Router, private menuApi: MenuApi) { }

  navigateLogin() {
    this.router.navigate(['auth/login'])
  }

  track_onClick() {
    if (!this.orderCodeControl.value) return;
    this.trackLoading = this.menuApi.trackOrder(this.orderCodeControl.value).subscribe(({ data }: any) => {
      if (data) {
        this.orderNotFound = false;
        const order = [data.order].map((el: OrderDto) => {
          return {
            ...el,
            totalPrice: this.getTotalPrice(el.products),
            date: moment(new Date(el.order.date)).locale('fa').format('HH:mm:ss YYYY/MM/DD'),
          }
        })[0];
        this._order$.next(order)
      } if (data === null) {
        this.orderNotFound = true;
        this._order$.next(null)
      }
    });
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

  getProductImage(product: Product) {
    return JSON.parse(product.imageUrl)[product.primaryImageIndex]
  }
}
