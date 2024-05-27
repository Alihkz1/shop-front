import { Component } from "@angular/core";

@Component({
    selector: 'auth-routing',
    template: `<div class="main">
                  <div class="box">
                    <router-outlet></router-outlet>   
                  </div>
               </div>
              `,
    styleUrls: ['./auth.routing.component.scss']
})
export class AuthRoutingComponent { }