import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ClientService } from '../../../shared/service/client.service';
import { ShopCard } from '../../../shared/model/shop-card.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-confirm-card',
  templateUrl: './confirm-card.component.html',
  styleUrl: './confirm-card.component.scss'
})
export class ConfirmCardComponent implements OnInit {
  public totalPrice: number = 0;
  saveLoading: Subscription;

  form = new FormGroup({
    receiverName: new FormControl(null, [Validators.required]),
    receiverPhone: new FormControl(null, [Validators.required]),
    receiverEmail: new FormControl(null),
    address: new FormControl(null, [Validators.required]),
    postalCode: new FormControl(null, [Validators.required]),
    description: new FormControl(),
  })

  constructor(
    private menuApi: MenuApi,
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
        const cards: ShopCard[] = data.card;
        this.totalPrice = 0;
        cards.forEach((card: ShopCard) => {
          this.totalPrice += card.price * card.inCardAmount;
        })
      }
    })
  }

  pay_onClick() {
    if (this.form.invalid) {
      this.message.create('error', this.translate.instant('formInvalid'))
      return
    }
    const { userId } = this.client.getUser.user;
    this.menuApi.addOrder(
      {
        ...this.form.value,
        userId
      }
    ).subscribe(({ success }: any) => {
      if (success) {
        /* move to online-pay */
      }
    })
  }
}
