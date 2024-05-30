import { Injectable } from '@angular/core';
import { DIRECTION } from '../enum/direction.enum';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  public setDirection(direction: DIRECTION) {
    const html = document.getElementsByTagName('html')[0];
    html['dir'] = direction;
    const style = document.createElement('link');
    style.href = 'bootstrap-' + direction + '-loader.css';
    style.rel = 'stylesheet';
    document.head.appendChild(style);
  }
}
