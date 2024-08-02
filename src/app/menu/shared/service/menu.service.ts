import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'tinymce';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _headerSearch$ = new BehaviorSubject<string>(null);
  public set setHeaderSearch(v: string) { this._headerSearch$.next(v) }
  public get headerSearchAsObs() { return this._headerSearch$.asObservable() }

  private _headerSearchHistory$ = new BehaviorSubject<any[]>(null);
  public set setHeaderSearchHistory(value: any[]) { this._headerSearchHistory$.next(value) }
  public get headerSearchHistoryAsObs(): any { return this._headerSearchHistory$.asObservable() }
  public get headerSearchHistoryValue(): any[] { return this._headerSearchHistory$.getValue() }
}
