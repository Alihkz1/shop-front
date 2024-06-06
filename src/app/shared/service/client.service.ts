import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { BehaviorSubject } from 'rxjs';
import { IHeaderButton } from '../config/header-buttons.config';

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

  isLogin = false;

  set setUser(user: { token: string, user: User }) {
    this.isLogin = true;
    localStorage.setItem('shopUser', JSON.stringify(user));
  }

  logout() {
    this.isLogin = false;
    localStorage.setItem('shopUser', "null");
  }

  get getUser() {
    return JSON.parse(localStorage.getItem('shopUser') || "null");
  }
}
