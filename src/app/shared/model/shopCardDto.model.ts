import { ProductDto } from "./productDto.model";
import { ShopCard } from "./shop-card.model";

export interface ShopCardDto {
    shopCard: ShopCard,
    product: ProductDto
}