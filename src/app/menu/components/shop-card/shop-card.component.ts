import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, finalize } from 'rxjs';
import { ClientService } from '../../../shared/service/client.service';
import { Product } from '../../../shared/model/product.model';
import { Size } from '../../../shared/model/size.model';
import { ShopCardDto } from '../../../shared/model/shop-card-dto.model';
import { AmountCheckDto } from '../../../shared/model/amount-check-dto.model';

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

  private _cards$ = new BehaviorSubject<ShopCardDto[]>([]);
  public get cards(): ShopCardDto[] { return this._cards$.getValue() }

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
        let cards: ShopCardDto[] = data.cards;
        const productIds: number[] = cards.map((el: ShopCardDto) => el.product.product.productId);
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
                    product: {
                      ...card.product.product,
                      imageUrl: JSON.parse(card.product.product.imageUrl)[0],
                      amount: resp.data.products.find((el: AmountCheckDto) => el.productId === card.product.product.productId).amount,
                      price: resp.data.products.find((el: AmountCheckDto) => el.productId === card.product.product.productId).price,
                    }
                  }
                }
              })
              cards.forEach((c: any) => {
                this.totalPrice += c.product.product.price * c.shopCard.amount;
              })
              this._cards$.next(cards);
            }
          })
      } else this.dataLoading = false;
    })
  }

  navigateToProduct(card: Product) {
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
    const productIds = this.cards.map((e => e.product.product.productId))
    this.menuApi.productAmountCheck({ ids: productIds })
      .pipe(finalize(() => { this.dataLoading = false; }))
      .subscribe(({ success, data }: any) => {
        if (success) {
          const products: AmountCheckDto[] = data.products;
          let hasAnyLowerAmount = false;
          products.forEach((productInServer: AmountCheckDto) => {
            const productInCard = this.cards.find((e) => e.product.product.productId === productInServer.productId);
            if (productInServer.isSized) {
              if (productInServer.sizes.find((el: Size) => el.size == productInCard.shopCard.size).amount < productInCard.shopCard.amount) {
                hasAnyLowerAmount = true;
              }
            } else if (productInServer.amount < productInCard.shopCard.amount) {
              hasAnyLowerAmount = true;
            }
          })
          if (!hasAnyLowerAmount)
            this.router.navigate(['menu/confirm-card'])
          else this.getData()
        }
      })
  }

  hasAmountError(card: ShopCardDto) {
    if (card.shopCard.size === null)
      return card.shopCard.amount > card.product.product.amount
    else
      return card.shopCard.amount > card.product.productSize.find((e: Size) => e.size == card.shopCard.size).amount
  }

  disableConfirmCard(): boolean {
    let flag = false;
    if (this.cards.length === 0) return true;
    this.cards.forEach((card) => {
      if (card.shopCard.size === null) {
        if (card.shopCard.amount > card.product.product.amount)
          flag = true
      } else if (card.shopCard.amount > card.product.productSize.find((e: Size) => e.size == card.shopCard.size).amount)
        flag = true;
    })
    if (this.totalPrice === 0) return true
    else return flag
  }
}
