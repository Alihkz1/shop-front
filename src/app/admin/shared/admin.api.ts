import { Injectable } from '@angular/core';
import { Api } from '../../shared/class/request-builder';

@Injectable({
  providedIn: 'root'
})
export class AdminApi {

  public getComments(model: any = {}) {
    return Api()
      .get()
      .controller('comment')
      .action('list')
      .param(model)
      .call()
  }

  public getUserComments(userId: number) {
    return Api()
      .get()
      .controller('comment')
      .action('user')
      .pathVariable(String(userId))
      .call()
  }

  public editComment(model: any) {
    return Api()
      .put()
      .controller('comment')
      .action('edit')
      .body(model)
      .call()
  }

  public getCategories() {
    return Api()
      .get()
      .controller('category')
      .action('list')
      .call()
  }

  public deleteCategory(categoryId: number) {
    return Api()
      .delete()
      .controller('category')
      .action('delete')
      .pathVariable(String(categoryId))
      .call()
  }

  public editCategory(model: any) {
    return Api()
      .put()
      .controller('category')
      .action('edit')
      .body(model)
      .call()
  }

  public addCategory(model: any) {
    return Api()
      .post()
      .controller('category')
      .action('add')
      .body(model)
      .call()
  }

  public addProduct(model: any) {
    return Api()
      .post()
      .controller('product')
      .action('add')
      .body(model)
      .call()
  }

  public editProduct(model: any) {
    return Api()
      .put()
      .controller('product')
      .action('edit')
      .body(model)
      .call()
  }

  public deleteProduct(productId: number) {
    return Api()
      .delete()
      .controller('product')
      .action('delete')
      .pathVariable(String(productId))
      .call()
  }

  public deleteComment(commentId: number) {
    return Api()
      .delete()
      .controller('comment')
      .action('delete')
      .pathVariable(String(commentId))
      .call()
  }

  public getUsers() {
    return Api()
      .get()
      .controller('user')
      .action('list')
      .call()
  }

  public getUser(userId: number) {
    return Api()
      .get()
      .controller('user')
      .action('retrieve')
      .pathVariable(String(userId))
      .call()
  }

  public editUser(model: any) {
    return Api()
      .put()
      .controller('user')
      .action('edit')
      .body(model)
      .call()
  }

  public deleteUser(userId: number) {
    return Api()
      .delete()
      .controller('user')
      .action('delete')
      .pathVariable(String(userId))
      .call()
  }

  public changePassword(model: { userId: number; newPassword: string }) {
    return Api()
      .put()
      .controller('user')
      .action('change-password')
      .body(model)
      .call()
  }
}
