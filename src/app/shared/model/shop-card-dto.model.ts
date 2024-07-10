import { ProductDto } from "./product-dto.model";
import { ShopCard } from "./shop-card.model";

export interface ShopCardDto {
    shopCard: ShopCard,
    product: ProductDto
}