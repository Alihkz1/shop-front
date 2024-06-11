import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../shared/model/product.model';
import { ClientService } from '../../../shared/service/client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private _products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public get products() { return this._products$.getValue() }

  constructor(
    private router: Router,
    private menuApi: MenuApi,
    public client: ClientService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    const { categoryId } = this.route.snapshot.params;
    this.menuApi.getProducts(categoryId).subscribe(({ success, data }: any) => {
      if (success) {
        this._products$.next(data.products);
      }
    })
  }

  board_onClick(product: Product) {
    const { categoryId } = this.route.snapshot.params;
    this.router.navigate(['menu/products/' + categoryId + '/' + product.productId])
  }

  deleteProduct_onClick(product: Product) { }

  editProduct_onClick(product: Product) { }
}
