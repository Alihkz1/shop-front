import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuApi } from '../../shared/menu.api';
import { Product } from '../../../shared/model/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private menuApi: MenuApi) { }
  product: Product;
  
  ngOnInit(): void {
    this.getData()
  }


  getData() {
    const { productId } = this.route.snapshot.params;
    this.menuApi.getProductRetrieve(productId).subscribe(({ success, data }: any) => {
      if (!success) return;
      this.product = data.product;
    })
  }

}
