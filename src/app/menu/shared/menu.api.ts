import { Injectable } from '@angular/core';
import { Api } from '../../shared/class/request-builder';

@Injectable({
  providedIn: 'root'
})
export class MenuApi {

  uploadFile(file: FormData) {
    return Api()
      .post()
      .controller('upload')
      .body(file)
      .call();
  }

  addComment(model: { message: string }) {
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
      .action('light-list')
      .call();
  }

  public getProducts(params: any = {}) {
    return Api()
      .get()
      .controller('product')
      .action('list')
      .param(params)
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

  public getMostBuy() {
    return Api()
      .get()
      .controller('product')
      .action('most-buy')
      .call();
  }

  public getNewest() {
    return Api()
      .get()
      .controller('product')
      .action('newest')
      .call();
  }

  public getUser() {
    return Api()
      .get()
      .controller('user')
      .action('retrieve')
      .call();
  }

  public trackOrder(orderCode: string) {
    return Api()
      .get()
      .controller('order')
      .action('track')
      .pathVariable(String(orderCode))
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

  public getUserShopCardLightList() {
    return Api()
      .get()
      .controller('card')
      .action('light')
      .call()
  }

  public getUserShopCard() {
    return Api()
      .get()
      .controller('card')
      .action('user')
      .call()
  }

  public getUserShopCardLength() {
    return Api()
      .get()
      .controller('card')
      .action('length')
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

  public deleteShopCard(shopCardId: number) {
    return Api()
      .delete()
      .controller('card')
      .action('delete')
      .pathVariable(String(shopCardId))
      .call()
  }

  public addOrder(model: any) {
    return Api()
      .post()
      .controller('order')
      .action('add')
      .body(model)
      .call()
  }

  public getOrders(model: { status?: number }) {
    return Api()
      .get()
      .controller('order')
      .action('list')
      .param(model)
      .call()
  }

  public orderNotDeliver(orderId: number) {
    return Api()
      .put()
      .controller('order')
      .action('not-deliver')
      .pathVariable(String(orderId))
      .call()
  }

  public productAmountCheck(model: any) {
    return Api()
      .get()
      .controller('product')
      .action('amount-check')
      .param(model)
      .call()
  }

  public likeProduct(productId: number) {
    return Api()
      .put()
      .controller('product')
      .action('like')
      .pathVariable(String(productId))
      .call()
  }

  public removeProductLike(productId: number) {
    return Api()
      .put()
      .controller('product')
      .action('remove-like')
      .pathVariable(String(productId))
      .call()
  }

  public saveProduct(model: any) {
    return Api()
      .post()
      .controller('saved')
      .action('add')
      .body(model)
      .call()
  }

  public deleteSave(model: any) {
    return Api()
      .delete()
      .controller('saved')
      .action('delete')
      .body(model)
      .call()
  }

  public getUserSavedItems() {
    return Api()
      .get()
      .controller('saved')
      .call()
  }

  public productIsSaved(model: any) {
    return Api()
      .get()
      .controller('saved')
      .action('is-saved')
      .param(model)
      .call()
  }

  public searchProductByName(model: any) {
    return Api()
      .get()
      .controller('product')
      .action('search')
      .param(model)
      .call()
  }

  public getSearchHistory() {
    return Api()
      .get()
      .controller('user-product-search')
      .call()
  }

  public deleteSearchHistoryById(searchId: number) {
    return Api()
      .delete()
      .controller('user-product-search')
      .action('delete')
      .pathVariable(searchId.toString())
      .call()
  }
}
