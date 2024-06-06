import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';
import { ClientService } from '../../shared/service/client.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private get headers(): HttpHeaders {
    return new HttpHeaders().append("Authorization", "Bearer " + this.client.getUser.token)
  }

  constructor(
    private http: HttpClient,
    private client: ClientService
  ) { }

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
    return this.http.get(environment.API_BASE + "user/list", {
      headers: this.headers
    });
  }

  public getUser(userId: number) {
    return this.http.get(environment.API_BASE + "user/retrieve/" + userId);
  }

  public editUser(model: any) {
    return this.http.put(environment.API_BASE + "user/edit", model)
  }
}
