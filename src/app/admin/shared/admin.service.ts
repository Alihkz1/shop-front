import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';
import { ClientService } from '../../shared/service/client.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private get requestOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders().append("Authorization", "Bearer " + this.client.getUser.token)
    }
  }

  constructor(
    private http: HttpClient,
    private client: ClientService
  ) { }

  public getComments() {
    return this.http.get(environment.API_BASE + "comment/list", this.requestOptions);
  } 


  public editComment(model: any) {
    return this.http.put(environment.API_BASE + "comment/edit", model, this.requestOptions)
  }

  public getCategories() {
    return this.http.get(environment.API_BASE + "category/list");
  }

  public deleteCategory(categoryId: number) {
    return this.http.delete(environment.API_BASE + "category/delete/" + categoryId, this.requestOptions)
  }

  public editCategory(model: any) {
    return this.http.put(environment.API_BASE + "category/edit", model, this.requestOptions)
  }

  public addCategory(model: any) {
    return this.http.post(environment.API_BASE + "category/add", model, this.requestOptions)
  }

  public addProduct(model: any) {
    return this.http.post(environment.API_BASE + "product/add", model, this.requestOptions)
  }

  public editProduct(model: any) {
    return this.http.put(environment.API_BASE + "product/edit", model, this.requestOptions)
  }

  public deleteProduct(productId: number) {
    return this.http.delete(environment.API_BASE + "product/delete/" + productId, this.requestOptions)
  }

  public deleteComment(commentId: number) {
    return this.http.delete(environment.API_BASE + "comment/delete/" + commentId, this.requestOptions)
  }

  public getUsers() {
    return this.http.get(environment.API_BASE + "user/list", this.requestOptions);
  }

  public getUser(userId: number) {
    return this.http.get(environment.API_BASE + "user/retrieve/" + userId);
  }

  public editUser(model: any) {
    return this.http.put(environment.API_BASE + "user/edit", model)
  }
}
