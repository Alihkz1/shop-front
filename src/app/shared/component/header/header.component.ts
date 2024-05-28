import { Component } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { TranslateModule } from "@ngx-translate/core";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public client: ClientService) { }

  logout_onClick() { }

  profile_onClick() { }

  login_onClick() { }

}
