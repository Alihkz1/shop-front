import { Component, OnInit } from '@angular/core';
import { MenuApi } from '../../shared/menu.api';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
  private _mostBuy$ = new BehaviorSubject<any[]>([]);
  private _newest$ = new BehaviorSubject<any[]>([]);
  public get mostBuy() { return this._mostBuy$.getValue() }
  public get newest() { return this._newest$.getValue() }

  constructor(private menuApi: MenuApi) { }

  ngOnInit(): void {
    this.getMostBuy()
    this.getNewest()
  }

  getMostBuy() {
    this.menuApi.getMostBuy().subscribe(({ data }: any) => {
      this._mostBuy$.next(data.products)
    })
  }

  getNewest() {
    this.menuApi.getNewest().subscribe(({ data }: any) => {
      this._newest$.next(data.products)
    })
  }
}
