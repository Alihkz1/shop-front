import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

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
}
