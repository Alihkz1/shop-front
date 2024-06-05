import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public getComments() {
    return this.http.get(environment.API_BASE + "comment/list");
  }


  public editComment(model: any) {
    return this.http.put(environment.API_BASE + "comment/edit", model)
  }

  public getCategories() {
    return this.http.get(environment.API_BASE + "category/list");
  }

  public deleteCategory(categoryId: number) {
    return this.http.delete(environment.API_BASE + "category/delete/" + categoryId)
  }

  public editCategory(model: any) {
    return this.http.put(environment.API_BASE + "category/edit", model)
  }

  public addCategory(model: any) {
    return this.http.post(environment.API_BASE + "category/add", model)
  }

  public addProduct(model: any) {
    return this.http.post(environment.API_BASE + "product/add", model)
  }

  public editProduct(model: any) {
    return this.http.put(environment.API_BASE + "product/edit", model)
  }

  public deleteProduct(productId: number) {
    return this.http.delete(environment.API_BASE + "product/delete/" + productId)
  }

  public deleteComment(commentId: number) {
    return this.http.delete(environment.API_BASE + "comment/delete/" + commentId)
  }

  public getUsers() {
    return this.http.get(environment.API_BASE + "user/list");
  }
}
