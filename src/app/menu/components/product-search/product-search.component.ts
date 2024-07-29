import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../shared/service/menu.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Product } from '../../../shared/model/product.model';

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
    this.dataLoading = this.menuApi.searchProductByName({ q }).subscribe(({ data }: any) => {
      if (data) this._items$.next(data.products)
    })
  }

  public getProductImage(product: Product) {
    return JSON.parse(product.imageUrl)[product.primaryImageIndex]
  }


  public product_onClick(product: Product) {
    this.router.navigate(['menu/products', product.categoryId, product.productId])
  }
}
