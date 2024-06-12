import { Injectable } from '@angular/core';
import { Api } from '../../shared/class/request-builder';

@Injectable({
  providedIn: 'root'
})
export class MenuApi {

  addComment(model: { userId: number, message: string | null }) {
    return Api()
      .post()
      .controller('comment')
      .action('add')
      .body(model)
      .call();
  }

  public getCategories() {
    return Api()
      .get()
      .controller('category')
      .action('list')
      .call();
  }

  public getProducts(categoryId: number) {
    return Api()
      .get()
      .controller('product')
      .action('list')
      .pathVariable(String(categoryId))
      .call();
  }

  public getProductRetrieve(productId: number) {
    return Api()
      .get()
      .controller('product')
      .action('retrieve')
      .pathVariable(String(productId))
      .call();
  }

  public getUser(userId: number) {
    return Api()
      .get()
      .controller('user')
      .action('retrieve')
      .pathVariable(String(userId))
      .call();
  }

  public editUser(model: any) {
    return Api()
      .put()
      .controller('user')
      .action('edit')
      .body(model)
      .call();
  }

  public getUserShopCard(userId: number) {
    return Api()
      .get()
      .controller('card')
      .action('user')
      .pathVariable(String(userId))
      .call()
  }

  public getUserShopCardLength(userId: number) {
    return Api()
      .get()
      .controller('card')
      .action('length')
      .pathVariable(String(userId))
      .call()
  }

  public modifyShopCard(model: any) {
    return Api()
      .post()
      .controller('card')
      .action('modify')
      .body(model)
      .call()
  }
}
