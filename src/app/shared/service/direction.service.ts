import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  public setDirection(direction: string) {
    const html = document.getElementsByTagName('html')[0];
    html['dir'] = direction;
    const style = document.createElement('link');
    style.href = 'bootstrap-' + direction + '-loader.css';
    style.rel = 'stylesheet';
    document.head.appendChild(style);
  }
}
