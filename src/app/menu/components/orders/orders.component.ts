import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ClientService } from '../../../shared/service/client.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

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
      data.orders;
    })
  }

}
