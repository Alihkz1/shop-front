import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProductSearch } from '../../../shared/model/user-product-search.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _headerSearchHistory$ = new BehaviorSubject<UserProductSearch[]>(null);
  public set setHeaderSearchHistory(value: UserProductSearch[]) { this._headerSearchHistory$.next(value) }
  public get headerSearchHistoryValue(): UserProductSearch[] { return this._headerSearchHistory$.getValue() }
}
