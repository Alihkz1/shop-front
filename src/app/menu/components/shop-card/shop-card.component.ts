import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.scss'
})
export class ShopCardComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private menuApi: MenuApi
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    const { userId } = this.route.snapshot.params;
    this.menuApi.getUserShopCard(userId).subscribe()
  }

}
