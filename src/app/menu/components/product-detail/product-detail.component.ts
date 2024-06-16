import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuApi } from '../../shared/menu.api';
import { Product } from '../../../shared/model/product.model';
import { ClientService } from '../../../shared/service/client.service';
import { BehaviorSubject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { ProductModalComponent } from '../../../shared/component/product-modal/product-modal.component';
import { AdminApi } from '../../../admin/shared/admin.api';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ShopCard } from '../../../shared/model/shop-card.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  productInShopCardFlag = false
  inCardAmount: number = 0

  private _userShopCard$ = new BehaviorSubject<ShopCard[]>([]);
  public get userShopCard() { return this._userShopCard$.getValue() }

  constructor(
    public router: Router,
    private menuApi: MenuApi,
    public adminApi: AdminApi,
    public client: ClientService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private translate: TranslateService,
    public modalService: NzModalService,
  ) { }


  ngOnInit(): void {
    this.getData()
  }

  private checkProductInShopCard() {
    let products: ShopCard[] = this.userShopCard;
    const productInShopCard = products.find(p => p.productId === this.product.productId)
    if (productInShopCard) {
      this.productInShopCardFlag = true
      this.inCardAmount = productInShopCard.inCardAmount
    }
  }

  private getShopCard() {
    if (!this.client.isLogin || this.client.isAdmin) return;
    this.menuApi.getUserShopCard(this.client.getUser.user.userId).subscribe(({ success, data }: any) => {
      if (success && data) {
        this._userShopCard$.next(data.card)
        this.checkProductInShopCard()
      }
    })
  }

  private getData() {
    const { productId } = this.route.snapshot.params;
    this.menuApi.getProductRetrieve(productId).subscribe(({ success, data }: any) => {
      if (!success) return;
      this.product = data.product;
      this.getShopCard()
    })
  }

  public addToCard() {
    let products: any[] = this.userShopCard;
    if (products.map(p => p.productId).includes(this.product.productId)) {
      this.message.create('info', this.translate.instant('alreadyInCard'))
      return;
    }
    products.push(this.product);
    products = products.map((p) => {
      return {
        ...p,
        inCardAmount: 1
      }
    })
    const model = {
      userId: this.client.getUser.user.userId,
      products
    }
    this.menuApi.modifyShopCard(model).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('addedToCard'))
        this.productInShopCardFlag = true;
        this.inCardAmount  = 1;
        this.client.shopCardLength += 1;
      }
    })
  }

  public navigateToLogin() {
    localStorage.setItem('routeAfterLogin', this.router.url)
    this.router.navigate(['/auth/login'])
  }

  deleteProduct_onClick(product: Product) {
    const { categoryId } = this.route.snapshot.params
    this.adminApi.deleteProduct(product.productId).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('actionDone'))
        this.router.navigate(['/menu/products', categoryId])
      }
    })
  }

  editProduct_onClick(product: Product) {
    this.modalService.create({
      nzFooter: null,
      nzCentered: true,
      nzClosable: false,
      nzStyle: {
        width: "400px",
        borderRadius: "6px",
      },
      nzContent: ProductModalComponent,
      nzData: { product },
      nzOnOk: () => {
      },
    }).afterClose.subscribe((result: boolean) => {
      if (result) this.getData()
    })
  }

  minCount() {
    const card = this.userShopCard.filter(c => c.productId === this.product.productId)[0]
    if (card.inCardAmount < 1) return;
    card.inCardAmount--;
    this.inCardAmount -= 1;
    this.updateCards();
  }

  addCount() {
    const card = this.userShopCard.filter(c => c.productId === this.product.productId)[0]
    card.inCardAmount++;
    this.inCardAmount += 1;
    this.updateCards();
  }

  private updateCards() {
    const model = {
      userId: this.client.getUser.user.userId,
      products: this.userShopCard
    }
    this.menuApi.modifyShopCard(model).subscribe();
  }

}
