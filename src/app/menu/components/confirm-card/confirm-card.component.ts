import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ClientService } from '../../../shared/service/client.service';
import { ShopCard } from '../../../shared/model/shop-card.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { Location } from '@angular/common';
import { ShopCardDto } from '../../../shared/model/shopCardDto.model';

@Component({
  selector: 'app-confirm-card',
  templateUrl: './confirm-card.component.html',
  styleUrl: './confirm-card.component.scss'
})
export class ConfirmCardComponent implements OnInit {
  public totalPrice: number = 0;
  public shopCardId: number = 0;
  saveLoading: Subscription;
  privacyAccepted = false

  form = new FormGroup({
    receiverName: new FormControl(null, [Validators.required]),
    receiverPhone: new FormControl(null, [Validators.required, Validators.pattern(/^09\d{9}$/)]),
    receiverEmail: new FormControl(null),
    address: new FormControl(null, [Validators.required]),
    postalCode: new FormControl(null, [Validators.required]),
    description: new FormControl(),
  })

  constructor(
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
        this.totalPrice = 0;
        this.shopCardId = cards[0].shopCard.shopCardId;
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
    const { userId } = this.client.getUser.user;
    this.saveLoading = this.menuApi.addOrder(
      {
        ...this.form.value,
        shopCardId: this.shopCardId,
        userId
      }
    ).subscribe(({ success }: any) => {
      if (success) {
        /* move to online-pay */
        /* if online pay not success -> order.status =0 */
        /* if online pay success -> order.status = 1 */
        /* if online pay success -> shopCard.paid = 1 */
      }
    })
  }

  back() { this.location.back() }
}
