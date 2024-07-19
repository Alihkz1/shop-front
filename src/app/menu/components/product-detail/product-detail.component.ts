import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuApi } from '../../shared/menu.api';
import { Product } from '../../../shared/model/product.model';
import { ClientService } from '../../../shared/service/client.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { ProductModalComponent } from '../../../shared/component/product-modal/product-modal.component';
import { AdminApi } from '../../../admin/shared/admin.api';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ShopCard } from '../../../shared/model/shop-card.model';
import { FormControl } from '@angular/forms';
import { Size } from '../../../shared/model/size.model';
import { ProductDto } from '../../../shared/model/product-dto.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: ProductDto;
  productInShopCardFlag = false
  wantToBuyAmount: number = 0
  productInShopCard: ShopCard;
  dataLoading: Subscription;

  sizeFormControl = new FormControl();
  public get selectedSize() { return this.sizeFormControl.value }

  private _userShopCard$ = new BehaviorSubject<ShopCard[]>([]);
  public get userShopCard(): ShopCard[] { return this._userShopCard$.getValue() }

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
    this.changeSizeListener()
  }

  private getData() {
    const { productId } = this.route.snapshot.params;
    this.dataLoading = this.menuApi.getProductRetrieve(productId).subscribe(({ success, data }: any) => {
      if (!success) return;
      this.product = data.product;
      this.product.product.imageUrl = JSON.parse(data.product.product.imageUrl)
      if (data.product.productSize.length > 0) {
        this.product.productSize = data.product.productSize
          .sort((a: Size, b: Size) => +a.size - +b.size)
        // .filter((e: Size) => e.amount > 0);
      }
      this.getShopCard()
    })
  }


  private checkProductInShopCard() {
    const products: ShopCard[] = this.userShopCard;
    this.productInShopCard = products.find(p => p.productId === this.product.product.productId)
    if (this.productInShopCard) {
      this.productInShopCardFlag = true
      this.wantToBuyAmount = this.productInShopCard.amount
      this.sizeFormControl.setValue(this.productInShopCard.size)
    }
  }

  private getShopCard() {
    if (!this.client.isLogin || this.client.isAdmin) return;
    this.menuApi.getUserShopCardLightList(this.client.getUser.user.userId).subscribe(({ success, data }: any) => {
      if (success && data) {
        this._userShopCard$.next(data.cards)
        this.checkProductInShopCard()
      }
    })
  }

  public addToCard() {
    const model = {
      shopCardId: this.productInShopCard?.shopCardId,
      productId: this.product.product.productId,
      userId: this.client.getUser.user.userId,
      size: this.sizeFormControl.value,
      amount: 1,
      paid: 0,
    }
    this.menuApi.modifyShopCard(model).subscribe(({ success, data }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('addedToCard'))
        this.getShopCard()
        this.client.shopCardLength += 1;
        this.productInShopCardFlag = true;
        this.productInShopCard = data.card
        this.wantToBuyAmount = data.card.amount
      }
    })
  }

  deleteFromShopCard() {
    this.menuApi.deleteShopCard(this.productInShopCard.shopCardId).subscribe(({ success }: any) => {
      if (success) {
        this.client.shopCardLength -= 1;
        this.productInShopCard = null;
        this.productInShopCardFlag = false;
        this.wantToBuyAmount = 0;
        this.sizeFormControl.reset()
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

  editProduct_onClick() {
    this.modalService.create({
      nzFooter: null,
      nzCentered: true,
      nzClosable: false,
      nzStyle: {
        width: "500px",
        borderRadius: "6px",
      },
      nzContent: ProductModalComponent,
      nzData: { product: this.product },
      nzOnOk: () => { },
    }).afterClose.subscribe((result: boolean) => {
      this.getData()
    })
  }

  minCount() {
    if (this.wantToBuyAmount === 1 || this.wantToBuyAmount === 0) return
    this.wantToBuyAmount -= 1;
    this.modifyShopCard()
  }

  addCount() {
    const card = this.userShopCard.find(c => c.productId === this.product.product.productId);
    if (!card) return;
    if (this.product.productSize.length > 0) {
      const maxAmountOfSelectedSize = +this.product.productSize
        .find((e: Size) => e.size === this.selectedSize).amount;
      if (this.wantToBuyAmount >= maxAmountOfSelectedSize) {
        this.message.create('error', this.translate.instant('noAmountForThisSize', {
          size: this.selectedSize,
          count: maxAmountOfSelectedSize
        }));
        return
      } else {
        this.wantToBuyAmount += 1
        this.modifyShopCard()
      }
    }
    else {
      if (this.wantToBuyAmount >= this.product.product.amount) {
        this.message.create('error', this.translate.instant('noAmount', {
          count: this.product.product.amount
        }));
        return
      }
      this.wantToBuyAmount += 1
      this.modifyShopCard()
    }
  }

  changeSizeListener() {
    this.sizeFormControl.valueChanges.subscribe((value: string) => {
      if (!value) return;
      const card = this.userShopCard.find(c => c.productId === this.product.product.productId);
      if (!card) return;
      const maxAmountOfSelectedSize = +this.product.productSize.find((e: Size) => e.size == value).amount;
      if (this.wantToBuyAmount > maxAmountOfSelectedSize) {
        this.wantToBuyAmount = +maxAmountOfSelectedSize
      }
      this.modifyShopCard()
    })
  }

  modifyShopCard() {
    const model = {
      shopCardId: this.productInShopCard?.shopCardId,
      productId: this.product.product.productId,
      userId: this.client.getUser.user.userId,
      size: this.sizeFormControl.value,
      amount: this.wantToBuyAmount,
      paid: 0,
    }
    this.menuApi.modifyShopCard(model).subscribe(({ success, data }: any) => {
      if (success) {
        this.productInShopCardFlag = true;
        this.productInShopCard = data.card
        this.wantToBuyAmount = data.card.amount
      }
    })
  }

  back() {
    const { categoryId } = this.route.snapshot.params
    this.router.navigate(['menu/products', categoryId])
  }

  onCrud() {
    const { productId } = this.route.snapshot.params
    this.router.navigate(['admin/product-crud'], {
      queryParams: {
        productId
      }
    })
  }
}
