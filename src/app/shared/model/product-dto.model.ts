import { Product } from "./product.model";
import { Size } from "./size.model";

export interface ProductDto {
    product: Product,
    productSize: Size[]
}