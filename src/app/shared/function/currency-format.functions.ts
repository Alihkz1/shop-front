export function NumberToCurrency(value: string | number): string {
    const valueString = value.toString();
    return valueString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
