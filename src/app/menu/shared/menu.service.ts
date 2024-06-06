import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  addComment(model: { userId: number, message: string }) {
    return this.http.post(environment.API_BASE + 'comment/add', model);
  }

  public getCategories() {
    return this.http.get(environment.API_BASE + "category/list");
  }

  public getProducts(categoryId: number) {
    return this.http.get(environment.API_BASE + "product/list/" + categoryId);
  }

  public getUser(userId: number) {
    return this.http.get(environment.API_BASE + "user/retrieve/" + userId);
  }

  public editUser(model: any) {
    return this.http.put(environment.API_BASE + "user/edit", model)
  }

}
