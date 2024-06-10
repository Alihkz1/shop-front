import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';
import { ClientService } from '../../shared/service/client.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private get requestOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders().append("Authorization", "Bearer " + this.client.getUser.token)
    }
  }

  constructor(
    private http: HttpClient,
    private client: ClientService
  ) { }

  addComment(model: { userId: number, message: string | null }) {
    return this.http.post(environment.API_BASE + 'comment/add', model);
  }

  public getCategories() {
    return this.http.get(environment.API_BASE + "category/list");
  }

  public getProducts(categoryId: number) {
    return this.http.get(environment.API_BASE + "product/list/" + categoryId);
  }

  public getUser(userId: number) {
    return this.http.get(environment.API_BASE + "user/retrieve/" + userId, this.requestOptions);
  }

  public editUser(model: any) {
    return this.http.put(environment.API_BASE + "user/edit", model, this.requestOptions);
  }

}
