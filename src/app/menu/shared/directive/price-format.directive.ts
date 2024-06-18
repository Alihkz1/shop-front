import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[priceFormat]',
    standalone: true
})
export class PriceFormatDirective {

    private el: HTMLInputElement;

    constructor(private elementRef: ElementRef, private control: NgControl) {
        this.el = this.elementRef.nativeElement;
    }

    @HostListener('input', ['$event.target.value'])
    onInput(value: string): void {
        // Remove all non-digit characters
        const rawValue = value.replace(/,/g, '');
        // Format the value with commas
        const formattedValue = this.formatNumber(rawValue);
        // Update the view
        this.el.value = formattedValue;
        // Update the model
        this.control.control?.setValue(formattedValue);
    }

    private formatNumber(value: string): string {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}
