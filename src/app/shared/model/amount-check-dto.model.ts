import { Size } from "./size.model";

export interface AmountCheckDto {
    productId: number;
    amount: number;
    price: number;
    isSized: boolean;
    sizes: Size[];
}