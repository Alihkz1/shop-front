import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(environment.API_BASE + 'user/login', model);
  }

  signup(model: any) {
    return this.http.post(environment.API_BASE + 'user/signup', model);
  }
}
