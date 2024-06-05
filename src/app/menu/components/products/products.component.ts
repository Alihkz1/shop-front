import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../shared/menu.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../shared/model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private _products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public get products() { return this._products$.getValue() }

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    const { categoryId } = this.route.snapshot.params;
    this.menuService.getProducts(categoryId).subscribe(({ success, data }: any) => {
      if (success) {
        this._products$.next(data.products);
      }
    })
  }

  board_onClick(product: Product) { }
}
