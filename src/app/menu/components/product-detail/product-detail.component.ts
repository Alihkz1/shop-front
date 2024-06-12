import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuApi } from '../../shared/menu.api';
import { Product } from '../../../shared/model/product.model';
import { ClientService } from '../../../shared/service/client.service';
import { BehaviorSubject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  private _userShopCard$ = new BehaviorSubject<Product[]>([]);
  public get userShopCard() {
    return this._userShopCard$.getValue()
  }

  constructor(
    private menuApi: MenuApi,
    private route: ActivatedRoute,
    public client: ClientService,
    public router: Router,
    private message: NzMessageService,
    private translate: TranslateService,
  ) { }


  ngOnInit(): void {
    this.getData()
    this.getShopCard()
  }

  private getShopCard() {
    if (!this.client.isLogin || this.client.isAdmin) return;
    this.menuApi.getUserShopCard(this.client.getUser.user.userId).subscribe(({ success, data }: any) => {
      if (success && data) {
        this._userShopCard$.next(data.card)
      }
    })
  }

  private getData() {
    const { productId } = this.route.snapshot.params;
    this.menuApi.getProductRetrieve(productId).subscribe(({ success, data }: any) => {
      if (!success) return;
      this.product = data.product;
    })
  }

  public addToCard() {
    let products: Product[] = this.userShopCard;
    if (products.map(p => p.productId).includes(this.product.productId)) {
      this.message.create('info', this.translate.instant('alreadyInCard'))
      return;
    }
    products.push(this.product);
    const model = {
      userId: this.client.getUser.user.userId,
      products
    }
    this.menuApi.modifyShopCard(model).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('addedToCard'))
        this.client.shopCardLength += 1;
      }
    })
  }

  public navigateToLogin() {
    this.router.navigate(['/auth/login'])
  }

}
