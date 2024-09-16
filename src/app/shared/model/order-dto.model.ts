import { Order } from "./order.model";
import { Product } from "./product.model";

export interface OrderDto {
    order: Order;
    products: OrderProduct[];
    showNotReceived: boolean;
    totalPrice: number;
    date: string
}

export interface OrderProduct {
    product: Product;
    size: string;
    amount: number;
    color: string;
}