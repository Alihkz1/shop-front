import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ShopCard } from '../../../shared/model/shop-card.model';
import { ClientService } from '../../../shared/service/client.service';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.scss'
})
export class ShopCardComponent implements OnInit {
  public totalPrice: number = 0;
  private _cards$ = new BehaviorSubject<ShopCard[]>([]);
  public get cards(): ShopCard[] { return this._cards$.getValue() }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private client: ClientService,
    private menuApi: MenuApi
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    const { userId } = this.route.snapshot.params;
    this.menuApi.getUserShopCard(userId).subscribe(({ data, success }: any) => {
      if (success) {
        const cards: ShopCard[] = data.card;
        this.totalPrice = 0;
        cards.forEach((card: ShopCard) => {
          this.totalPrice += card.price * card.inCardAmount;
        })
        this._cards$.next(cards);
      }
    })
  }

  minCount(card: ShopCard) {
    if (card.inCardAmount < 1) return;
    card.inCardAmount --;
    const products = this.cards.map((c: ShopCard) => {
      if (c.productId === card.productId) {
        return {
          ...c,
          inCardAmount: c.inCardAmount++
        }
      } else return c;
    })
    this._cards$.next(products);
    this.updateCards();
    this.totalPrice -= card.price
  }

  addCount(card: ShopCard) {
    card.inCardAmount ++;
    const products = this.cards.map((c: ShopCard) => {
      if (c.productId === card.productId) {
        return {
          ...c,
          inCardAmount: c.inCardAmount++
        }
      } else return c;
    })
    this._cards$.next(products);
    this.updateCards();
    this.totalPrice += card.price;
  }

  private updateCards() {
    const model = {
      userId: this.client.getUser.user.userId,
      products: this.cards
    }
    this.menuApi.modifyShopCard(model).subscribe();
  }

  navigateToProduct(card: ShopCard) {
    this.router.navigate(['menu/products', card.categoryId, card.productId])
  }

  deleteFromShopCard(card: ShopCard) {
    const otherCards = this.cards.filter(c => c.productId != card.productId);
    const model = {
      userId: this.client.getUser.user.userId,
      products: otherCards
    }
    this.menuApi.modifyShopCard(model).subscribe(({ success }: any) => {
      if (success) {
        this.totalPrice = this.totalPrice - card.price * card.inCardAmount;
        this.client.shopCardLength -= 1;
        this.getData()
      }
    })
  }

  onPay() { }
}
