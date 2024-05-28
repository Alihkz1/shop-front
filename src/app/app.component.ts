import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectionService } from './shared/service/direction.service';
import { DIRECTION } from './shared/enum/direction.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(direction: DirectionService) {
    direction.setDirection(DIRECTION.RTL);
  }
}
