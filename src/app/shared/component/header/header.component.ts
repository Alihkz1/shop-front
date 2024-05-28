import { Component } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { TranslateModule } from "@ngx-translate/core";
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public client: ClientService, private router: Router) { }

  logout_onClick() { }

  profile_onClick() { }

  aboutUs_onClick() {
    this.router.navigate(['menu/about-us'])
   }

  login_onClick() {
    this.router.navigate(['auth/login'])
  }

}
