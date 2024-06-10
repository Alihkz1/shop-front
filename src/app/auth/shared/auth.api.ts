import { Injectable } from '@angular/core';
import { Api } from '../../shared/class/request-builder';

@Injectable({
  providedIn: 'root'
})
export class AuthApi {

  login(model: any) {
    return Api()
      .post()
      .controller('user')
      .action('login')
      .body(model)
      .call()
  }

  signup(model: any) {
    return Api()
    .post()
    .controller('user')
    .action('signup')
    .body(model)
    .call()
  }
}
