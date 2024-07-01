import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectionService } from './shared/service/direction.service';
import { DIRECTION } from './shared/enum/direction.enum';
import { ClientService } from './shared/service/client.service';
import { ROLE } from './shared/enum/role.enum';
import { ADMIN_BUTTONS, USER_BUTTONS } from './shared/config/header-buttons.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /* / -> menu/categories */
  /* admin guard */
  /* uncomment images */
  constructor(direction: DirectionService, private client: ClientService) {
    direction.setDirection(DIRECTION.RTL);
    if (client.getUser != null && client.getUser != undefined) {
      client.isLogin = true;
      if (client.getUser.user.role === ROLE.ADMIN) {
        client.setHeaderButtons = ADMIN_BUTTONS;
      } else client.setHeaderButtons = USER_BUTTONS;

    }
  }
}
