import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ClientService } from '../../../shared/service/client.service';
import { ShopCard } from '../../../shared/model/shop-card.model';

@Component({
  selector: 'app-confirm-card',
  standalone: true,
  imports: [],
  templateUrl: './confirm-card.component.html',
  styleUrl: './confirm-card.component.scss'
})
export class ConfirmCardComponent implements OnInit {
  public totalPrice: number = 0;

  constructor(
    private menuApi: MenuApi,
    private client: ClientService
  ) { }

  ngOnInit(): void {
    this.getShopCard()
  }

  private getShopCard() {
    if (!this.client.isLogin || this.client.isAdmin) return;
    this.menuApi.getUserShopCard(this.client.getUser.user.userId).subscribe(({ success, data }: any) => {
      if (success && data) {
        const cards: ShopCard[] = data.card;
        this.totalPrice = 0;
        cards.forEach((card: ShopCard) => {
          this.totalPrice += card.price * card.inCardAmount;
        })
      }
    })
  }


}
