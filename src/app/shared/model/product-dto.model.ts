import { About } from "./about.model";
import { Color } from "./color.model";
import { Product } from "./product.model";
import { Size } from "./size.model";

export interface ProductDto {
    product: Product,
    productSize: Size[],
    productAbout: About[]
    productColor: Color[]
}