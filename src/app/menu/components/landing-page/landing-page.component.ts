import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../../../shared/model/product.model';

export interface IFeature {
  svg: string,
  title: string,
  description: string,
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
  private _mostBuy$ = new BehaviorSubject<Product[]>([]);
  private _newest$ = new BehaviorSubject<Product[]>([]);
  public get mostBuy() { return this._mostBuy$.getValue() }
  public get newest() { return this._newest$.getValue() }

  public features: IFeature[] = [
    {
      svg: 'assets/svg/support.svg',
      title: 'پشتیبانی 24/7',
      description: 'خدمات پس از فروش'
    },
    {
      svg: 'assets/svg/original.svg',
      title: 'ضمانت اصل بودن کالا',
      description: 'تمامی محصولات اصل هستند'
    },
    {
      svg: 'assets/svg/online-pay.svg',
      title: 'پرداخت امن',
      description: 'پرداخت امن با کارت بانکی'
    },
    {
      svg: 'assets/svg/fast-post.svg',
      title: 'ارسال سریع',
      description: 'ارسال به صورت روزانه'
    }
  ]

  constructor(
    private menuApi: MenuApi,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMostBuy()
    this.getNewest()
  }

  private getMostBuy() {
    this.menuApi.getMostBuy().subscribe(({ data }: any) => {
      this._mostBuy$.next(data.products)
    })
  }

  private getNewest() {
    this.menuApi.getNewest().subscribe(({ data }: any) => {
      this._newest$.next(data.products)
    })
  }

  public onInstagram() { }

  public onTelegram() { }

  public onSeeAll() {
    this.router.navigate(['menu/categories'])
  }

  public goToProduct(categoryId: number, productId: number) {
    this.router.navigate(['menu/products', categoryId, productId])
  }

  getProductImage(product: Product) {
    return JSON.parse(product.imageUrl)[product.primaryImageIndex]
  }
}
