import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ClientService } from '../../../shared/service/client.service';
import { BehaviorSubject, from, groupBy, mergeMap, of, toArray } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private _orders$ = new BehaviorSubject<any[]>([]);
  public get orders() { return this._orders$.getValue() }
  
  constructor(
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
          products: JSON.parse(el.products)
        }
      })
      this._orders$.next(mapped)
    })
  }

}
