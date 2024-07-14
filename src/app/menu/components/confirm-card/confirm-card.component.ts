import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ClientService } from '../../../shared/service/client.service';
import { ShopCard } from '../../../shared/model/shop-card.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { Location } from '@angular/common';
import { ShopCardDto } from '../../../shared/model/shop-card-dto.model';
import { Router } from '@angular/router';
import { AmountCheckDto } from '../../../shared/model/amount-check-dto.model';
import { Size } from '../../../shared/model/size.model';

@Component({
  selector: 'app-confirm-card',
  templateUrl: './confirm-card.component.html',
  styleUrl: './confirm-card.component.scss'
})
export class ConfirmCardComponent implements OnInit {
  public totalPrice: number = 0;
  saveLoading: Subscription;
  privacyAccepted = false

  private _cards$ = new BehaviorSubject<ShopCardDto[]>([]);
  public get cards(): ShopCardDto[] { return this._cards$.getValue() }


  form = new FormGroup({
    receiverName: new FormControl(null, [Validators.required]),
    receiverPhone: new FormControl(null, [Validators.required, Validators.pattern(/^09\d{9}$/)]),
    receiverEmail: new FormControl(null),
    address: new FormControl(null, [Validators.required]),
    postalCode: new FormControl(null, [Validators.required]),
    description: new FormControl(),
  })

  constructor(
    private router: Router,
    private menuApi: MenuApi,
    private location: Location,
    private client: ClientService,
    private message: NzMessageService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getShopCard()
  }

  private getShopCard() {
    if (!this.client.isLogin || this.client.isAdmin) return;
    this.menuApi.getUserShopCard(this.client.getUser.user.userId).subscribe(({ success, data }: any) => {
      if (success && data) {
        const cards: ShopCardDto[] = data.cards;
        this._cards$.next(data.cards);
        this.totalPrice = 0;
        cards.forEach((card: ShopCardDto) => {
          this.totalPrice += card.product.product.price * card.shopCard.amount;
        })
      }
    })
  }

  pay_onClick() {
    if (this.form.get('receiverPhone').hasError('pattern')) {
      this.message.create('error', this.translate.instant('wrongPhoneFormat'))
      return;
    }
    if (this.form.invalid) {
      this.message.create('error', this.translate.instant('formInvalid'))
      return
    }
    const productIds: number[] = this.cards.map((el: any) => el.product.product.productId);
    this.menuApi.productAmountCheck({ ids: productIds })
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
            this.goToPay()
          else {
            this.message.create('error', this.translate.instant('orderAmountError'))
            const { userId } = this.client.getUser.user;
            this.router.navigate(['menu/card', userId])
          }
        }
      })

  }

  goToPay() {
    const { userId, email } = this.client.getUser.user;
    this.saveLoading = this.menuApi.addOrder(
      {
        ...this.form.value,
        userId,
        username: email
      }
    ).subscribe(({ success }: any) => {
      if (success) {
        this.client.shopCardLength = 0;
        this.message.create('success', this.translate.instant('orderSubmit'))
        this.router.navigate(['menu/orders'])
        /* move to online-pay */
        /* then move to my orders */
        /* if online pay not success -> order.status =0 */
        /* if online pay success -> order.status = 1 */
        /* if online pay success -> shopCard.paid = 1 */
      }
    })
  }

  back() { this.location.back() }
}
