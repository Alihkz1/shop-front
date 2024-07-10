import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, finalize } from 'rxjs';
import { ShopCard } from '../../../shared/model/shop-card.model';
import { ClientService } from '../../../shared/service/client.service';
import { Product } from '../../../shared/model/product.model';

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

  private _cards$ = new BehaviorSubject<any[]>([]);
  public get cards(): { shopCard: any; product: any }[] { return this._cards$.getValue() }

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
      if (success && data?.cards) {
        let cards: ShopCard[] = data.cards;
        const productIds: number[] = cards.map((el: any) => el.product.productId);
        this.totalPrice = 0;
        this.menuApi.productAmountCheck({ ids: productIds })
          .pipe(finalize(() => { this.dataLoading = false; }))
          .subscribe((resp: any) => {
            if (resp.success) {
              cards = cards.map((card: any) => {
                return {
                  ...card,
                  product: {
                    ...card.product,
                    amount: resp.data.products.find((el: any) => el.productId === card.product.productId).amount,
                    price: resp.data.products.find((el: any) => el.productId === card.product.productId).price,
                  }
                }
              })
              cards.forEach((c: any) => {
                this.totalPrice += c.product.price * c.shopCard.amount;
              })
              this.amountError = cards.findIndex((el: any) => el.amount < el.shopCard.amount) != -1;
              this._cards$.next(cards);
            }
          })
      } else this.dataLoading = false;
    })
  }

  navigateToProduct(card: ShopCard) {
    this.router.navigate(['menu/products', card.categoryId, card.productId])
  }

  deleteFromShopCard(shopCardId: number) {
    this.menuApi.deleteShopCard(shopCardId).subscribe(({ success }: any) => {
      if (success) {
        this.client.shopCardLength -= 1;
        this.getData()
      }
    })
  }

  onConfirmCard() {
    this.dataLoading = true
    const productIds = this.cards.map((e => e.product.productId))
    this.menuApi.productAmountCheck({ ids: productIds })
      .pipe(finalize(() => { this.dataLoading = false; }))
      .subscribe(({ success, data }: any) => {
        if (success) {
          const products: Product[] = data.products;
          let hasAnyLowerAmount = false;
          products.forEach((productInServer: Product) => {
            const productInCard = this.cards.find((e) => e.product.productId === productInServer.productId);
            if (productInServer.amount < productInCard.shopCard.amount) {
              hasAnyLowerAmount = true;
            }
          })
          if (!hasAnyLowerAmount)
            this.router.navigate(['menu/confirm-card'])
          else this.getData()
        }
      })
  }
}
