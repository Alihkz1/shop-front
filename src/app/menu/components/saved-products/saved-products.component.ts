import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ClientService } from '../../../shared/service/client.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Product } from '../../../shared/model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-products',
  templateUrl: './saved-products.component.html',
  styleUrl: './saved-products.component.scss'
})
export class SavedProductsComponent implements OnInit {
  dataLoading: Subscription;

  private _savedItems$ = new BehaviorSubject([]);
  public get savedItems() { return this._savedItems$.getValue() }

  constructor(
    private client: ClientService,
    private menuApi: MenuApi,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  private getData() {
    const { userId } = this.client.getUser.user;
    this.dataLoading = this.menuApi.getUserSavedItems(userId).subscribe(({ data }: any) => {
      if (data) this._savedItems$.next(data.products)
    })
  }

  public getProductImage(product: Product) {
    return JSON.parse(product.imageUrl)[product.primaryImageIndex]
  }

  public product_onClick(product: Product) {
    this.router.navigate(['menu/products', product.categoryId, product.productId])
  }
}
