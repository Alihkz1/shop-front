import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../shared/service/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuApi } from '../../shared/menu.api';
import { LIKE_SVG_PATH } from '../../../shared/enum/like-svg.enum';
import { SAVE_SVG_PATH } from '../../../shared/enum/save-svg.enum';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductDto } from '../../../shared/model/product-dto.model';
import { Size } from '../../../shared/model/size.model';
import { ShopCard } from '../../../shared/model/shop-card.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from "@ngx-translate/core";
import { Color } from '../../../shared/model/color.model';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  /* change size */
  /* better cols margin */
  likeSvgPath = LIKE_SVG_PATH.not_like;
  saveSvgPath = SAVE_SVG_PATH.unsaved;
  dataLoading: Subscription;
  product: ProductDto;
  selectedSize: Size;
  selectedColor: Color;
  productInShopCardFlag = false
  wantToBuyAmount: number = 0
  productInShopCard: ShopCard;

  private _userShopCard$ = new BehaviorSubject<ShopCard[]>([]);
  public get userShopCard(): ShopCard[] { return this._userShopCard$.getValue() }


  constructor(
    private router: Router,
    private menuApi: MenuApi,
    private route: ActivatedRoute,
    public client: ClientService,
    private message: NzMessageService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.checkIsSaved()
    this.getData()
  }

  public productIsAvailable(): boolean {
    if (this.product.productSize.length > 0) {
      return this.product.productSize.findIndex(el => el.amount > 0) > -1;
    } else {
      return this.product.product.amount > 0;
    }
  }

  private checkIsSaved() {
    if (!this.client.isLogin) return
    const { productId } = this.route.snapshot.params;
    const model = {
      productId,
      userId: this.client.getUser.user.userId
    }
    this.menuApi.productIsSaved(model).subscribe(({ data }: any) => {
      if (data) {
        this.saveSvgPath = SAVE_SVG_PATH.saved;
      }
    })
  }

  private getShopCard() {
    if (!this.client.isLogin || this.client.isAdmin) return;
    this.menuApi.getUserShopCardLightList().subscribe(({ success, data }: any) => {
      if (success && data) {
        this._userShopCard$.next(data.cards)
        this.checkProductInShopCard(data.cards)
      }
    })
  }

  private checkProductInShopCard(products: ShopCard[]) {
    this.productInShopCard = products.find(p => p.productId === this.product.product.productId)
    if (this.productInShopCard) {
      this.productInShopCardFlag = true
      this.wantToBuyAmount = this.productInShopCard.amount
      this.selectedSize = this.product.productSize.find((e: Size) => e.size === this.productInShopCard.size);
      this.selectedColor = this.product.productColor.find((e: Color) => e.color === this.productInShopCard.color)
    }
  }

  private getData() {
    const { productId } = this.route.snapshot.params;
    this.dataLoading = this.menuApi.getProductRetrieve(productId).subscribe(({ success, data }: any) => {
      if (!success) return;
      this.product = data.product;
      this.product.product.imageUrl = JSON.parse(data.product.product.imageUrl)
      this.getShopCard()
      if (data.product.productSize.length > 0) {
        this.product.productSize = data.product.productSize
          .sort((a: Size, b: Size) => +a.size - +b.size)
      }
    })
  }

  public addToCard_onClick() {
    if (this.product.productSize.length > 0 && !this.selectedSize) {
      this.message.create('error', this.translate.instant('pleaseSelectSize'));
      return
    }
    const model = {
      shopCardId: this.productInShopCard?.shopCardId,
      productId: this.product.product.productId,
      userId: this.client.getUser.user.userId,
      size: this.product.productSize.length > 0 ? this.selectedSize.size : null,
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

  public selectSize_onClick(size: Size) {
    if (size.amount < 1) {
      this.message.create('error', this.translate.instant('sizeNotAvailable'));
      return
    }
    if (size.amount < this.wantToBuyAmount)
      this.wantToBuyAmount = size.amount
    this.selectedSize = size;
    this.modifyShopCard()
  }

  public selectColor_onClick(color: Color) {
    this.selectedColor = color;
    this.modifyShopCard()

  }


  public delete_onClick() {
    this.menuApi.deleteShopCard(this.productInShopCard.shopCardId).subscribe(({ success }: any) => {
      if (success) {
        this.client.shopCardLength -= 1;
        this.productInShopCard = null;
        this.productInShopCardFlag = false;
        this.wantToBuyAmount = 1;
        this.selectedSize = null;
      }
    })
  }

  minus_onClick() {
    if (this.wantToBuyAmount === 1 || this.wantToBuyAmount === 0) return
    this.wantToBuyAmount -= 1;
    this.modifyShopCard()
  }

  plus_onClick() {
    const card = this.userShopCard.find(c => c.productId === this.product.product.productId);
    if (!card) return;
    if (this.product.productSize.length > 0) {
      const maxAmountOfSelectedSize = +this.product.productSize
        .find((e: Size) => e.size === this.selectedSize.size).amount;
      if (this.wantToBuyAmount >= maxAmountOfSelectedSize) {
        this.message.create('error', this.translate.instant('noAmountForThisSize', {
          size: this.selectedSize.size,
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

  modifyShopCard() {
    const model = {
      shopCardId: this.productInShopCard?.shopCardId,
      productId: this.product.product.productId,
      userId: this.client.getUser.user.userId,
      size: this.selectedSize?.size,
      color: this.selectedColor?.color,
      amount: this.wantToBuyAmount > 0 ? this.wantToBuyAmount : 1,
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

  goToCard() {
    this.router.navigate(['menu/card'])
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

  register_onClick() {
    localStorage.setItem('routeAfterLogin', this.router.url)
    this.router.navigate(['auth/login'])
  }

  public saveChange_onClick() {
    const { productId } = this.route.snapshot.params
    const model = {
      productId,
      userId: this.client.getUser.user.userId
    }
    if (this.saveSvgPath === SAVE_SVG_PATH.unsaved)
      this.menuApi.saveProduct(model).subscribe(({ success }: any) => {
        if (success) {
          this.saveSvgPath = SAVE_SVG_PATH.saved;
          this.message.create('success',
            this.translate.instant('productSaved')
          )
        }
      })
    else
      this.menuApi.deleteSave(model).subscribe(({ success }: any) => {
        if (success) {
          this.saveSvgPath = SAVE_SVG_PATH.unsaved;
        }
      })
  }

  public likeChange_onClick() {
    const { productId } = this.route.snapshot.params
    if (this.likeSvgPath === LIKE_SVG_PATH.not_like)
      this.menuApi.likeProduct(productId).subscribe(({ success }: any) => {
        if (success) {
          this.product.product.likes += 1;
          this.likeSvgPath = LIKE_SVG_PATH.like;
        }
      })
    else
      this.menuApi.removeProductLike(productId).subscribe(({ success }: any) => {
        if (success) {
          this.product.product.likes -= 1;
          this.likeSvgPath = LIKE_SVG_PATH.not_like;
        }
      })
  }
}
