import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent implements OnInit {

  constructor(
    private menuApi: MenuApi,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    const { q } = this.route.snapshot.queryParams;
    this.menuApi.searchProductByName({ q }).subscribe()
  }

}
