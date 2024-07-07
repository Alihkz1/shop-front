import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, finalize } from 'rxjs';
import { ShopCard } from '../../../shared/model/shop-card.model';
import { ClientService } from '../../../shared/service/client.service';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.scss'
})
export class ShopCardComponent implements OnInit {
  public totalPrice: number = 0;
  public amountError: boolean = false;
  dataLoading = false;
  loadingCounter = 0;

  private _cards$ = new BehaviorSubject<ShopCard[]>([]);
  public get cards(): ShopCard[] { return this._cards$.getValue() }

  constructor(
    private router: Router,
    private menuApi: MenuApi,
    private route: ActivatedRoute,
    private client: ClientService,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    if (this.loadingCounter === 0) this.dataLoading = true;
    this.loadingCounter++;

    const { userId } = this.route.snapshot.params;
    this.menuApi.getUserShopCard(userId).subscribe(({ data, success }: any) => {
      if (success) {
        let cards: ShopCard[] = data.card;
        const productIds: number[] = cards.map((el: ShopCard) => el.productId);
        this.totalPrice = 0;

        this.menuApi.productAmountCheck({ ids: productIds })
          .pipe(finalize(() => { this.dataLoading = false; }))
          .subscribe((resp: any) => {
            if (resp.success) {
              cards = cards.map((card: ShopCard) => {
                return {
                  ...card,
                  amount: resp.data.products.find((el: any) => el.productId === card.productId).amount,
                  price: resp.data.products.find((el: any) => el.productId === card.productId).price,
                }
              })
              cards.forEach((c: ShopCard) => {
                this.totalPrice += c.price * c.inCardAmount;
              })
              this.amountError = cards.findIndex((el: ShopCard) => el.amount < el.inCardAmount) != -1;
              this._cards$.next(cards);
            }
          })
      }
    })
  }

  minCount(card: ShopCard) {
    if (card.inCardAmount < 2) return;
    card.inCardAmount--;
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
    card.inCardAmount++;
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
    this.menuApi.modifyShopCard(model).subscribe(({ success }: any) => {
      if (success) this.getData()
    });
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

  onConfirmCard() {
    /* todo: call amount-check to see if prices are changed! */
    this.router.navigate(['menu/confirm-card'])
  }
}
