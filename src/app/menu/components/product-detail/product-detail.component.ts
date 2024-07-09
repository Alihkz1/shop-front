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

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: { product: Product, productSize: any[] };
  productInShopCardFlag = false
  inCardAmount: number = 0
  dataLoading: Subscription;
  sizeFormControl = new FormControl();
  public get selectedSize() { return this.sizeFormControl.value }

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
    this.changeSizeListener()
  }

  private getData() {
    const { productId } = this.route.snapshot.params;
    this.dataLoading = this.menuApi.getProductRetrieve(productId).subscribe(({ success, data }: any) => {
      if (!success) return;
      this.product = data.product;
      if (data.product.productSize.length > 0) {
        this.product.productSize = data.product.productSize.sort((a: any, b: any) => a.size - b.size).filter((e: any) => e.amount > 0);
      }
      this.getShopCard()
    })
  }


  private checkProductInShopCard() {
    /* todo */
    // const products: ShopCard[] = this.userShopCard;
    // const productInShopCard = products.find(p => p.productId === this.product.product.productId)
    // if (productInShopCard) {
    //   this.productInShopCardFlag = true
    //   this.inCardAmount = productInShopCard.inCardAmount
    //   this.sizeFormControl.setValue(productInShopCard.size)
    // }
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

  public addToCard() {
    /* todo */
    // let products: any[] = this.userShopCard;
    // if (products.map(p => p.productId).includes(this.product.product.productId)) {
    //   this.message.create('info', this.translate.instant('alreadyInCard'))
    //   return;
    // }
    // this.product.product.inCardAmount = 1;
    // products.push({ ...this.product, size: this.selectedSize });
    // const model = {
    //   userId: this.client.getUser.user.userId,
    //   products
    // }
    // this.menuApi.modifyShopCard(model).subscribe(({ success }: any) => {
    //   if (success) {
    //     this.message.create('success', this.translate.instant('addedToCard'))
    //     this.productInShopCardFlag = true;
    //     this.inCardAmount = 1;
    //     this.client.shopCardLength += 1;
    //     this.getShopCard()
    //   }
    // })
  }

  deleteFromShopCard() {
    /* todo */
    // const otherCards = this.userShopCard.filter(c => c.productId != this.product.product.productId);
    // const model = {
    //   userId: this.client.getUser.user.userId,
    //   products: otherCards
    // }
    // this.menuApi.modifyShopCard(model).subscribe(({ success }: any) => {
    //   if (success) {
    //     this.productInShopCardFlag = false;
    //     this.client.shopCardLength -= 1;
    //     this.getShopCard()
    //   }
    // })
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

  editProduct_onClick(product: any) {
    this.modalService.create({
      nzFooter: null,
      nzCentered: true,
      nzClosable: false,
      nzStyle: {
        width: "500px",
        borderRadius: "6px",
      },
      nzContent: ProductModalComponent,
      nzData: { product },
      nzOnOk: () => { },
    }).afterClose.subscribe((result: boolean) => {
      if (result) this.getData()
    })
  }

  minCount() {
    /* todo */
    // const card = this.userShopCard.find(c => c.productId === this.product.product.productId);
    // if (card.inCardAmount < 2) return;
    // card.inCardAmount--;
    // card.size = this.selectedSize
    // this.inCardAmount -= 1;
    // this.updateCards();
  }

  addCount() {
    /* todo */
    // if (this.product.productSize.length) {
    //   const maxOfSelectedSize = this.product.productSize.find((el: any) => el.size === this.selectedSize);
    //   if (this.inCardAmount >= maxOfSelectedSize.amount) {
    //     this.message.create(
    //       'error',
    //       this.translate.instant('noAmountForThisSize', { count: maxOfSelectedSize.amount, size: maxOfSelectedSize.size })
    //     )
    //     return
    //   }
    // }
    // const card = this.userShopCard.find(c => c.productId === this.product.product.productId);
    // if (card.inCardAmount >= this.product.product.amount) {
    //   this.message.create(
    //     'error',
    //     this.translate.instant('noAmount', { count: this.product.product.amount })
    //   )
    //   return
    // }
    // card.inCardAmount++;
    // card.size = this.selectedSize
    // this.inCardAmount += 1;
    // this.updateCards();
  }

  changeSizeListener() {
    this.sizeFormControl.valueChanges.subscribe((value: string) => {
      if (!value) return;
      const card = this.userShopCard.find(c => c.productId === this.product.product.productId);
      const maxAmountOfSelectedSize = +this.product.productSize.find((e: any) => e.size === value).amount;
      if (this.inCardAmount > maxAmountOfSelectedSize) {
        card.inCardAmount = +maxAmountOfSelectedSize;
        this.inCardAmount = +maxAmountOfSelectedSize
      }
      if (!card) return;
      /* todo */
      card.size = value
      this.updateCards();
    })
  }

  private updateCards() {
    const model = {
      userId: this.client.getUser.user.userId,
      products: this.userShopCard
    }
    this.menuApi.modifyShopCard(model).subscribe();
  }

  back() {
    const { categoryId } = this.route.snapshot.params
    this.router.navigate(['menu/products', categoryId])
  }

}
