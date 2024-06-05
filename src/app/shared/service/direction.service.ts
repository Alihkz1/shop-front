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
    this._iphonePadding();
  }

  private _iphonePadding(): void {
    const isIphone: boolean = /iPhone/i.test(navigator.userAgent);
    if (isIphone) {
      const body = document.getElementsByTagName('body')[0];
      body.style.setProperty('padding-bottom', '50px');
    }
  }
}
