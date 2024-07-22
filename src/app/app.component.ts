import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectionService } from './shared/service/direction.service';
import { DIRECTION } from './shared/enum/direction.enum';
import { ClientService } from './shared/service/client.service';
import { ROLE } from './shared/enum/role.enum';
import { ADMIN_BUTTONS, USER_BUTTONS } from './shared/config/header-buttons.config';
import { ViewportService } from './shared/service/view-port.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    client: ClientService,
    direction: DirectionService,
    viewPortService: ViewportService
  ) {
    direction.setDirection(DIRECTION.RTL);
    if (client.getUser != null && client.getUser != undefined) {
      client.isLogin = true;
      if (client.getUser.user.role === ROLE.ADMIN) {
        client.setHeaderButtons = ADMIN_BUTTONS;
      } else client.setHeaderButtons = USER_BUTTONS;
    }
  }
}
