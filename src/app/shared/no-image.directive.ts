import { Directive, ElementRef, Input } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Directive({
    selector: '[noImage]',
    standalone: true
})
export class NoImageDirective {
    @Input('noImage') set img(imageUrl: string) {
        if (!imageUrl) {
            const sanitizedUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl('src/assets/svg/no-image.svg');
            this.elementRef.nativeElement.src = sanitizedUrl;
        }
    }

    constructor(private elementRef: ElementRef, private sanitizer: DomSanitizer) { }
}