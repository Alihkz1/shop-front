import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  set setUser(user: any) {    
    localStorage.setItem('shopUser', JSON.stringify(user));
  }

  get getUser() {
    return JSON.parse(localStorage.getItem('shopUser') ?? '');
  }

  get isLogin(): boolean {    
    return localStorage.getItem('shopUser') !== null && localStorage.getItem('shopUser') !== 'null';
  }

}
