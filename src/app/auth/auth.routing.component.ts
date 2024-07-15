import { Component } from "@angular/core";

@Component({
  selector: 'auth-routing',
  template: `<div class="main">
                 <app-header></app-header>
                  <div class="d-flex justify-content-center align-items-center flex-grow-1">
                    <div class="box">
                    <router-outlet></router-outlet>   
                    </div>
                  </div>
               </div>
              `,
  styleUrls: ['./auth.routing.component.scss']
})
export class AuthRoutingComponent { }