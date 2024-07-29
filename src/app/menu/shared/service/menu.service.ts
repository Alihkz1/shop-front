import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _headerSearch$ = new BehaviorSubject<string>(null);
  public set setHeaderSearch(v: string) { this._headerSearch$.next(v) }
  public get headerSearchAsObs() { return this._headerSearch$.asObservable() }
}
