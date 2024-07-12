import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ViewportService {
    private viewportWidth$ = new BehaviorSubject<number>(window.innerWidth);

    constructor(private ngZone: NgZone) {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(window, 'resize').pipe(
                debounceTime(200),
                map(() => window.innerWidth)
            ).subscribe(width => this.ngZone.run(() => this.viewportWidth$.next(width)));
        });
    }

    get getViewportWidth(): number {
        return this.viewportWidth$.getValue();
    }
}
