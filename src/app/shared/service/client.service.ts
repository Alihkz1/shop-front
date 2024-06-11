import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { BehaviorSubject } from 'rxjs';
import { IHeaderButton } from '../config/header-buttons.config';
import { HttpClient } from '@angular/common/http';
import { ROLE } from '../enum/role.enum';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private _headerButtons$ = new BehaviorSubject<any[]>([]);
  public set setHeaderButtons(buttons: IHeaderButton[]) {
    this._headerButtons$.next(buttons);
  }
  public get headerButtons(): IHeaderButton[] {
    return this._headerButtons$.getValue();
  }

  public isLogin = false;
  shopCardLength: number;
  public isAdmin = this.getUser?.user?.role === ROLE.ADMIN;

  constructor(public http: HttpClient) { }

  set setUser(user: { token: string, user: User }) {
    this.isLogin = true;
    localStorage.setItem('shopUser', JSON.stringify(user));
  }

  logout() {
    this.shopCardLength = 0;
    this.isAdmin = false;
    this.isLogin = false;
    localStorage.setItem('shopUser', "null");
  }

  get getUser(): { user: any, token: string } {
    return JSON.parse(localStorage.getItem('shopUser') || "null");
  }
}
