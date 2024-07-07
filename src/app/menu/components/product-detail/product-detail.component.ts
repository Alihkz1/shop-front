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
  product: any;
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
    this.changeSizeListener()
    this.getData()
  }

  private getData() {
    const { productId } = this.route.snapshot.params;
    this.dataLoading = this.menuApi.getProductRetrieve(productId).subscribe(({ success, data }: any) => {
      if (!success) return;
      this.product = data.product;
      this.product.size = data.product.size ? JSON.parse(data.product.size) : null;
      this.getShopCard()
    })
  }


  private checkProductInShopCard() {
    const products: ShopCard[] = this.userShopCard;
    const productInShopCard = products.find(p => p.productId === this.product.productId)
    if (productInShopCard) {
      this.productInShopCardFlag = true
      this.inCardAmount = productInShopCard.inCardAmount
      this.sizeFormControl.setValue(productInShopCard.size)
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

  public addToCard() {
    let products: any[] = this.userShopCard;
    if (products.map(p => p.productId).includes(this.product.productId)) {
      this.message.create('info', this.translate.instant('alreadyInCard'))
      return;
    }
    this.product.inCardAmount = 1;
    products.push({ ...this.product, size: this.selectedSize });
    const model = {
      userId: this.client.getUser.user.userId,
      products
    }
    this.menuApi.modifyShopCard(model).subscribe(({ success }: any) => {
      if (success) {
        this.message.create('success', this.translate.instant('addedToCard'))
        this.productInShopCardFlag = true;
        this.inCardAmount = 1;
        this.client.shopCardLength += 1;
        this.getShopCard()
      }
    })
  }

  deleteFromShopCard() {
    const otherCards = this.userShopCard.filter(c => c.productId != this.product.productId);
    const model = {
      userId: this.client.getUser.user.userId,
      products: otherCards
    }
    this.menuApi.modifyShopCard(model).subscribe(({ success }: any) => {
      if (success) {
        this.productInShopCardFlag = false;
        this.client.shopCardLength -= 1;
        this.getShopCard()
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
        width: "500px",
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
    if (card.inCardAmount < 2) return;
    card.inCardAmount--;
    card.size = this.selectedSize
    this.inCardAmount -= 1;
    this.updateCards();
  }

  addCount() {
    const card = this.userShopCard.filter(c => c.productId === this.product.productId)[0]
    card.inCardAmount++;
    card.size = this.selectedSize
    this.inCardAmount += 1;
    this.updateCards();
  }

  changeSizeListener() {
    this.sizeFormControl.valueChanges.subscribe((value: string) => {
      if (!value) return;
      const card = this.userShopCard.filter(c => c.productId === this.product.productId)[0]
      if (!card) return;
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
