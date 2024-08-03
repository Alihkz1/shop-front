import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _headerSearchHistory$ = new BehaviorSubject<any[]>(null);
  public set setHeaderSearchHistory(value: any[]) { this._headerSearchHistory$.next(value) }
  public get headerSearchHistoryAsObs(): any { return this._headerSearchHistory$.asObservable() }
  public get headerSearchHistoryValue(): any[] { return this._headerSearchHistory$.getValue() }
}
