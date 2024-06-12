import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ShopCard } from '../../../shared/model/shop-card.model';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.scss'
})
export class ShopCardComponent implements OnInit {
  private _cards$ = new BehaviorSubject<ShopCard[]>([]);
  public get cards(): ShopCard[] { return this._cards$.getValue() }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuApi: MenuApi
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    const { userId } = this.route.snapshot.params;
    this.menuApi.getUserShopCard(userId).subscribe(({ data, success }: any) => {
      const cards = data.card.map((el: any) => {
        return {
          ...el,
          inCardAmount: 1
        }
      })
      if (success) this._cards$.next(cards);
    })
  }

  minCount(card: ShopCard) {
    card.inCardAmount -= 1;
  }

  addCount(card: ShopCard) {
    card.inCardAmount += 1;
  }

  navigateToProduct(card: ShopCard) {
    this.router.navigate(['menu/products', card.categoryId, card.productId])
  }
}
