import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../shared/service/menu.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Product } from '../../../shared/model/product.model';
import { ClientService } from '../../../shared/service/client.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  dataLoading: Subscription;

  private _items$ = new BehaviorSubject([]);
  public get items() { return this._items$.getValue() }


  constructor(
    private router: Router,
    private menuApi: MenuApi,
    private client: ClientService,
    private route: ActivatedRoute,
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ q }: any) => {
      if (q)
        this.getData()
    });
  }

  ngOnDestroy(): void {
    this.menuService.setHeaderSearch = null;
  }

  getData() {
    const { q } = this.route.snapshot.queryParams;
    if (q) this.menuService.setHeaderSearch = q;
    const model = {
      q,
      u: this.client.isLogin ? this.client.getUser.user.userId : null
    }
    this.dataLoading = this.menuApi.searchProductByName(model).subscribe(({ data }: any) => {
      if (data) {
        this._items$.next(data.products)
        this.getSearchHistory()
      }
    })
  }

  private getSearchHistory() {
    if (this.client.isLogin)
      this.menuApi.getSearchHistory(this.client.getUser.user.userId).subscribe(({ data }: any) => {
        this.menuService.setHeaderSearchHistory = data.history;
      })
  }

  public getProductImage(product: Product) {
    return JSON.parse(product.imageUrl)[product.primaryImageIndex]
  }


  public product_onClick(product: Product) {
    this.router.navigate(['menu/products', product.categoryId, product.productId])
  }
}
