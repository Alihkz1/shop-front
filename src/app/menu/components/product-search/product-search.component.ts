import { Component, OnInit } from '@angular/core';
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
export class ProductSearchComponent implements OnInit {
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
        this.getData(q)
    });
  }

  getData(q: string) {
    const model = {
      q
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
      this.menuApi.getSearchHistory().subscribe(({ data }: any) => {
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
