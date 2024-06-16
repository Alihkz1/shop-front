import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyPipe',
  standalone: true
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number | string): string {
    if (!value) return '0';
    if (typeof value === 'number') {
      value = value.toString();
    }
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
